import { Component, OnInit } from '@angular/core';
import { Memories } from 'src/app/shared/types/components';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-memo',
  templateUrl: './current-memo.component.html',
  styleUrls: ['./current-memo.component.css']
})
export class CurrentMemoComponent implements OnInit {
id: string = ''
   memorie: Memories = {
      id: '',
      memorieModel: '',
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

    this.gts.getMemorieById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.memorie = config;
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
