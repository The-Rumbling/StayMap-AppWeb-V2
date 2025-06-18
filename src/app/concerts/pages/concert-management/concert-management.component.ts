import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../users/services/user.service';
import {Concert} from '../../model/concert.entity';
import {ConcertService} from '../../services/concert.service';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {ConcertCreateAndEditComponent} from '../../components/concert-create-and-edit/concert-create-and-edit.component';
import {User} from '../../../users/model/user.entity';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {SearchService} from '../../../shared/services/search.service';

@Component({
  selector: 'app-concert-management',
  imports: [
    MatButton,
    NgIf,
    ConcertCreateAndEditComponent,
    NgForOf
  ],
  templateUrl: './concert-management.component.html',
  styleUrl: './concert-management.component.css'
})
export class ConcertManagementComponent implements OnInit{
  protected concertService: ConcertService = inject(ConcertService);
  private searchService: SearchService = inject(SearchService);

  protected isArtist:boolean = false;
  protected currentUser:User=new User({});
  protected concertData: Concert=new Concert({});
  concerts: Array<Concert>=[];
  protected selectedGenres: string[]=[];
  protected genres:string[] = [
    "Pop", "Rock", "K-pop", "Indie", "Urbano",
    "Electrónica", "Salsa", "Cumbia", "Jazz"
  ];
  private searchValue = '';

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.userService.currentUser$.subscribe(user => {
      if(user) this.isArtist = user.type === 'artist';
    });
    this.concertData = new Concert({});
  }

  ngOnInit(): void {
    this.getAllConcerts();
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchValue = term;
    });
  }

  private getAllConcerts() {
    this.concertService.getAll().subscribe((response: Array<Concert>) => {
      console.log(' Conciertos cargados desde el JSON:', response);
      this.concerts = response;
    });
  }

  getLatLngFromAddress(address: string) {
    const encodedAddress = encodeURIComponent(address);
    console.log(encodedAddress);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAd-IuCKmGRzA4BsS2Yz_hR5FD6-XHUqjA`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.status === 'OK' && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng
          };
        } else {
          throw new Error(`Geocoding failed: ${response.status}`);
        }
      })
    );
  }

  private createConcert() {
    this.concertService.create({...this.concertData, id: new Date().getTime(), status: "Available"}).subscribe(() => {
      this.getAllConcerts();
    });
  }

  private resetState() {
    this.concertData = new Concert({});
  }

  protected onCancelRequested() {
    this.resetState();
    this.formVisible = false;
  }

  protected onConcertAddRequested(item: Concert) {
    this.concertData = item;
    this.getLatLngFromAddress(this.concertData.venue.address).subscribe(result => {
      console.log(this.concertData.venue.address);
      this.concertData.venue.location.lat=result.lat;
      this.concertData.venue.location.lng=result.lng;
      this.createConcert();
      this.resetState();
    })
  }
  protected formVisible = false;

  onAddConcertClicked() {
    const dialogRef = this.dialog.open(ConcertCreateAndEditComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      data: new Concert({})
    });

    dialogRef.componentInstance.concert = new Concert({});
    dialogRef.componentInstance.add.subscribe((newConcert: Concert) => {
      this.getLatLngFromAddress(newConcert.venue.address).subscribe(result => {
        newConcert.venue.location.lat = result.lat;
        newConcert.venue.location.lng = result.lng;
        newConcert.id = new Date().getTime();
        newConcert.status = 'Available';
        this.concertService.create(newConcert).subscribe(() => {
          this.getAllConcerts();
        });
      });
    });
  }

  protected onConcertCardClicked(concertId: number) {
    this.router.navigate(['/concerts', concertId]);
  }

  get filteredConcerts() {
    const term = this.searchValue.trim().toLowerCase();

    return this.concerts.filter(concert => {
      const matchesGenre =
        this.selectedGenres.length === 0 ||
        this.selectedGenres.includes(concert.artist.genre);

      const matchesSearch =
        term === '' ||
        concert.artist.name.toLowerCase().includes(term)

      return matchesGenre && matchesSearch;
    });
  }

  onGenreChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const genre = input.value;

    if (input.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
  }

  onViewMap(concertId: number) {
    this.router.navigate([`/map`, concertId]);
  }
}
