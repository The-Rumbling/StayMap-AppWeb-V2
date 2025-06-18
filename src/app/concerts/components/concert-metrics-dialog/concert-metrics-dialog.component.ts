import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatButton} from '@angular/material/button';
import {DecimalPipe} from '@angular/common';
import {Concert} from '../../model/concert.entity';

@Component({
  selector: 'app-concert-metrics-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatProgressBar,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DecimalPipe
  ],
  templateUrl: './concert-metrics-dialog.component.html',
  styleUrl: './concert-metrics-dialog.component.css'
})
export class ConcertMetricsDialogComponent {
  conversionRate: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { concert: Concert }) {
    this.conversionRate = data.concert.views.length > 0 ? (data.concert.attendees.length / data.concert.views.length) * 100 : 0;
  }
}
