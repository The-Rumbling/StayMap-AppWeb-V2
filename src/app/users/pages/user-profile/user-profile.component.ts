import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.entity';
import { Router, RouterLink } from '@angular/router';
import { Concert } from '../../../concerts/model/concert.entity';
import { ConcertService } from '../../../concerts/services/concert.service';
import { NgForOf, NgIf } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  UserProfileEditComponentComponent
} from '../../components/user-profile-edit.component/user-profile-edit.component.component';
import {MatButton} from '@angular/material/button';
import {
  ConcertMetricsDialogComponent
} from '../../../concerts/components/concert-metrics-dialog/concert-metrics-dialog.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatButton
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  currentUser: User = new User({});

  concertsAssisted: Concert[] = [];
  upcomingConcerts: Concert[] = [];

  private concertService = inject(ConcertService);
  private userService = inject(UserService);

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(userLogged => {
      this.userService.getById(userLogged.id).subscribe(user => {
        if (user) {
          console.log('Perfil recibió usuario actualizado:', user.upcomingConcerts);
          this.currentUser = user;
          this.currentUser.upcomingConcerts ??= [];
          this.loadConcerts();
        }
      });
    });
  }

  private loadConcerts(): void {
    console.log('Cargando upcoming desde perfil:', this.currentUser.upcomingConcerts);

    this.concertsAssisted = [];
    this.upcomingConcerts = [];

    const uniqueUpcoming = new Set<number>();

    this.currentUser.upcomingConcerts?.forEach(id => {
      if (!uniqueUpcoming.has(id)) {
        uniqueUpcoming.add(id);
        this.concertService.getById(id).subscribe(concert => {
          this.upcomingConcerts.push(concert);
        });
      }
    });

  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/concerts']);
  }

  onEditProfile() {
    this.dialog.open(UserProfileEditComponentComponent, {
      panelClass: 'custom-dialog-container',
      data: { user: this.currentUser }
    }).afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser)
        // Guardar cambios en el servicio
        this.userService.update(updatedUser.id, updatedUser).subscribe(() => {this.currentUser = updatedUser});
    });
  }

  protected openConcertMetricsDialog(concert: Concert): void {
    this.dialog.open(ConcertMetricsDialogComponent, {
      data:{concert}
    })
  }
}
