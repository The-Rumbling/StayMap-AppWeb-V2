  import { Component, EventEmitter, Input, Output, Optional, ViewChild } from '@angular/core';
  import { FormsModule, NgForm } from '@angular/forms';
  import { Concert } from '../../model/concert.entity';
  import { BaseFormComponent } from '../../../shared/components/base-form.component';
  import { MatButton } from '@angular/material/button';
  import {MatFormField, MatInput} from '@angular/material/input';
  import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
  import { MatSelectModule} from '@angular/material/select';
  import {MatNativeDateModule} from '@angular/material/core';
  import {

    MatDatepickerModule,

  } from '@angular/material/datepicker';
  import {MatIconModule} from '@angular/material/icon';
  import {NgForOf, NgIf} from '@angular/common';

  @Component({
    selector: 'app-concert-create-and-edit',
    standalone: true,
    imports: [
      FormsModule,
      MatButton,
      MatFormField,
      MatInput,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      NgIf,
      NgForOf
    ],
    templateUrl: './concert-create-and-edit.component.html',
    styleUrl: './concert-create-and-edit.component.css'
  })
  export class ConcertCreateAndEditComponent extends BaseFormComponent {
    @Input() concert!: Concert;
    @Output() add = new EventEmitter<Concert>();
    @Output() cancel = new EventEmitter<void>();
    @ViewChild('concertForm') protected concertForm!: NgForm;

    constructor(@Optional() private dialogRef?: MatDialogRef<ConcertCreateAndEditComponent>) {
      super();
    }
    ngOnInit() {
      if (!this.concert.artist) {
        this.concert.artist = { name: '', genre: '' };
      } else if (!this.concert.artist.genre) {
        this.concert.artist.genre = '';
      }
    }

    private isValid = () => this.concertForm?.valid;
    genres: string[] = [
      "Pop", "Rock", "K-pop", "Indie", "Urbano",
      "Electrónica", "Salsa", "Cumbia", "Jazz"
    ];

    private formatDate(date: Date): string {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const dia = date.getDate();
      const mes = meses[date.getMonth()];
      return `${dia} de ${mes}`;
    }

    onSubmit() {
      if (!this.isValid()) return;

      // Formatear la fecha antes de emitir
      const parsedDate = new Date(this.concert.date);
      if (!isNaN(parsedDate.getTime())) {
        this.concert.date = this.formatDate(parsedDate);
      }

      this.add.emit(this.concert);
      if (this.dialogRef) this.dialogRef.close(this.concert);
    }

    onCancel() {
      this.cancel.emit();
      if (this.dialogRef) this.dialogRef.close(); // Si está en diálogo, cierra
    }

  }
