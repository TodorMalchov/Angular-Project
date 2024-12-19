import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';
import { VideoCard } from 'src/app/shared/types/components';

@Component({
  selector: 'app-current-video-card',
  templateUrl: './current-video-card.component.html',
  styleUrls: ['./current-video-card.component.css']
})
export class CurrentVideoCardComponent implements OnInit {
id: string = ''
  videoCard: VideoCard = {
      id: '',
      videoCardModel: '',
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

    this.gts.getVideoCardById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.videoCard = config;
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