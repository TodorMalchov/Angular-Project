import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';
import { MotherBoard } from 'src/app/shared/types/components';

@Component({
  selector: 'app-current-mother-board',
  templateUrl: './current-mother-board.component.html',
  styleUrls: ['./current-mother-board.component.css']
})
export class CurrentMotherBoardComponent implements OnInit {
id: string = ''
   motherBoard: MotherBoard = {
      id: '',
      motherBoardModel: '',
      img: '',
      description: ''
    }

  constructor(private gts: GetComponentService,private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;
    if (!this.id) {
      console.error('ID липсва в URL-а.');
      return;
    }

    this.gts.getMotherBordById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.motherBoard = config;
        } else {
          console.warn('Не е намерена конфигурация с това ID.');
        }
      },
      error: (err) => {
        console.error('Грешка при зареждане на конфигурацията:', err);
      }
    })

    console.log('ID:', this.id);
  }
}