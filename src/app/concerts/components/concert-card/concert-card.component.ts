import {Component, Input} from '@angular/core';
import {Concert} from '../../model/concert.entity';
import {MatCard, MatCardContent, MatCardImage, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-concert-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardImage
  ],
  templateUrl: './concert-card.component.html',
  styleUrl: './concert-card.component.css'
})
export class ConcertCardComponent {
  @Input() concert!:Concert;
}
