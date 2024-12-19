import { Component, OnInit } from '@angular/core';
import { Procesor } from 'src/app/shared/types/components';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-procesor',
  templateUrl: './current-procesor.component.html',
  styleUrls: ['./current-procesor.component.css']
})
export class CurrentProcesorComponent implements OnInit {
id: string = ''
   procesor: Procesor = {
      id: '',
      procesorModel: '',
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

    this.gts.getProcesorById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.procesor = config;
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