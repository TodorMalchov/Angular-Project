import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';
import { Cooling } from 'src/app/shared/types/components';

@Component({
  selector: 'app-current-cooling',
  templateUrl: './current-cooling.component.html',
  styleUrls: ['./current-cooling.component.css']
})
export class CurrentCoolingComponent implements OnInit {
id: string = ''
   cooler: Cooling = {
      id: '',
      coolerModel: '',
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

    this.gts.getCoolingById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.cooler = config;
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

