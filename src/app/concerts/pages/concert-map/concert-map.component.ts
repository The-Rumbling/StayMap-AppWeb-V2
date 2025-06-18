import {AfterViewInit, Component, inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Concert} from '../../model/concert.entity';
import {NgClass, NgIf} from '@angular/common';
import {User} from '../../../users/model/user.entity';
import {UserService} from '../../../users/services/user.service';
import {ConcertService} from '../../services/concert.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-concert-map',
  imports: [
    GoogleMap,
    MapMarker,
    MapInfoWindow,
    NgIf,
    NgClass,
  ],
  templateUrl: './concert-map.component.html',
  styleUrl: './concert-map.component.css'
})
export class ConcertMapComponent implements OnInit, AfterViewInit{
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren('marker') markerRefs!: QueryList<MapMarker>;

  showUserMarker = false;
  currentUser=new User({});
  concertSelected: Concert = new Concert({});
  concerts: Array<Concert> = [];
  concertService = inject(ConcertService);
  mapMarkers= new Map<number, MapMarker>();

  //MAP SETTINGS

  zoom: number = 14;
  center: google.maps.LatLngLiteral = { lat: -12.080, lng: -77.070 };
  mapOptions: google.maps.MapOptions = { styles: [] };
  customIcon: google.maps.Icon = { url: 'https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png', scaledSize: new google.maps.Size(40, 40) };
  userIcon: google.maps.Icon = { url:'' };

  //METHODS

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userService.currentUser$.subscribe(user =>{
      if(user){
        this.currentUser = user;
        this.userIcon = {
          url: `${this.currentUser.profileImage}`,
          scaledSize: new google.maps.Size(40, 40)
        };
      }
    });
  }

  ngAfterViewInit(): void {
    this.markerRefs.changes.subscribe((refs: QueryList<MapMarker>) => {
      refs.forEach((marker, index) => {
        const concert = this.concerts[index];
        this.mapMarkers.set(concert.id, marker);
      });
    });
    this.route.paramMap.subscribe(params => {
      const concertIdStr=params.get('id');
      const concertId = concertIdStr ? +concertIdStr : null;
      if(concertId){
        this.concertService.getById(concertId).subscribe(concert => {
          this.openConcertInfo(concert);
        });
      }
    });
  }

  ngOnInit(): void {
    this.concertService.getAll().subscribe(concerts=>{
      this.concerts=concerts;
      for(let concert of this.concerts){
        concert.venue.location.lat = concert.venue.location.lat + this.getRandomOffset();
        concert.venue.location.lng = concert.venue.location.lng + this.getRandomOffset();
      }
    });
    if(this.currentUser.id !== 0 && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
          this.currentUser.location.lat = position.coords.latitude;
          this.currentUser.location.lng = position.coords.longitude;
          setTimeout(() => this.showUserMarker = true, 100);
          this.center = this.currentUser.location;
      });
    }
  }

  private getRandomOffset() {
    const offset = 0.00005;
    return (Math.random() - 0.5) * offset;
  }

  protected openConcertInfo(concert: Concert) {
    const tryOpen = () => {
      const mapMarker = this.mapMarkers.get(concert.id);
      if (mapMarker) {
        this.concertSelected = concert;
        this.center = {
          lat: concert.venue.location.lat,
          lng: concert.venue.location.lng
        };
        this.zoom = 16;
        this.infoWindow.open(mapMarker);
      } else {
        setTimeout(tryOpen, 100);
      }
    };
    tryOpen();
  }

  protected onCloseConcertInfo = (): void => { this.zoom = 14; };
}
