import {Component, Input} from '@angular/core';
import {Concert} from '../../model/concert.entity';
import {MatList} from '@angular/material/list';
import {ConcertCardComponent} from '../concert-card/concert-card.component';

@Component({
  selector: 'app-concert-list',
  imports: [
    MatList,
    ConcertCardComponent
  ],
  templateUrl: './concert-list.component.html',
  styleUrl: './concert-list.component.css'
})
export class ConcertListComponent {
  @Input() concerts!: Concert[];
}
