import { Component, OnInit } from '@angular/core';
import { Ram } from 'src/app/shared/types/components';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-ram',
  templateUrl: './current-ram.component.html',
  styleUrls: ['./current-ram.component.css']
})
export class CurrentRamComponent implements OnInit {
id: string = ''
   ram: Ram = {
      id: '',
      ramModel: '',
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

    this.gts.getRamById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.ram = config;
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
