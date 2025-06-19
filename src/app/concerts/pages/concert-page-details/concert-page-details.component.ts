import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ConcertService } from '../../services/concert.service';
import { Concert } from '../../model/concert.entity';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/model/user.entity';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-concert-page-details',
  templateUrl: './concert-page-details.component.html',
  imports: [NgForOf],
  styleUrls: ['./concert-page-details.component.css']
})
export class ConcertPageDetailsComponent implements OnInit {
  protected concert: Concert = new Concert({});
  protected user: User = new User({});
  protected isAttending: boolean = false;
  private concertService: ConcertService = inject(ConcertService);
  private userService: UserService = inject(UserService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const concertId = this.route.snapshot.paramMap.get('id');
    if (concertId) this.loadConcert(concertId);

    this.userService.currentUser$.subscribe(userLogged => {
      if (userLogged) {
        this.userService.getById(userLogged.id).subscribe(user => {
          const viewKey = `concert_${this.concert.id}_viewed_by_${user.id}`;
          const lastViewed = localStorage.getItem(viewKey);
          const hours = 12;
          const hasRecentlyViewed = lastViewed && (Date.now() - parseInt(lastViewed)) < hours * 60 * 60 * 1000;

          if (!hasRecentlyViewed) {
            this.concertService.update(this.concert.id, {
              ...this.concert,
              views: [...this.concert.views, user.id]
            }).subscribe(() => {
              localStorage.setItem(viewKey, Date.now().toString());
              this.user = user;
              this.checkAttendance();
            });
          } else {
            this.user = user;
            this.checkAttendance();
          }
        });
      }
    });
  }

  private loadConcert(concertId: string): void {
    this.concertService.getById(concertId).subscribe({
      next: (res) => {
        this.concert = new Concert(res);
        this.checkAttendance();
      },
      error: (err) => console.error('Error cargando concierto:', err)
    });
  }

  private checkAttendance(): void {
    this.isAttending = this.user.upcomingConcerts.includes(this.concert.id);
    console.log(this.isAttending);
  }

  toggleAttendance(): void {
    if (this.user.id === 0)
      this.router.navigate(['/login']).then(() => {});

    const updatedUser = new User({
      ...this.user,
      upcomingConcerts: [...(this.user.upcomingConcerts ?? [])]
    });

    const updatedConcert = new Concert({
      ...this.concert,
      attendees: [...(this.concert.attendees ?? [])]
    });

    const index = updatedUser.upcomingConcerts.findIndex(id => id == this.concert.id);

    if (index !== -1) {
      //REMOVING CONCERT ATTENDANCE
      updatedUser.upcomingConcerts.splice(index, 1);
      updatedConcert.attendees = updatedConcert.attendees.filter(userId => userId != this.user.id);
      this.isAttending = false;
    } else {
      //ADDING CONCERT ATTENDANCE
      updatedUser.upcomingConcerts.push(this.concert.id);
      updatedConcert.attendees.push(this.user.id);
      this.isAttending = true;
    }

    this.userService.update(updatedUser.id, updatedUser).subscribe({
      next: () => {
        this.concertService.update(updatedConcert.id, updatedConcert).subscribe(() => {
          this.user = updatedUser;
          alert(this.isAttending ? 'Asistencia confirmada' : 'Asistencia cancelada');
        })
      },
      error: err => console.error('Error al actualizar usuario:', err)
    });
  }
}
