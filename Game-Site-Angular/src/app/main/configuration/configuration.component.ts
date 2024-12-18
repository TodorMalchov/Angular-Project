import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';
import { Configurations } from 'src/app/shared/types/configurations';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit{
  id: string = '';
  configuration: Configurations = {
    id: '',
    procesors: '',
    video_cart: '',
    ram_memories: '',
    mother_board: '',
    memories: '',
    power_supply: '',
    cooling: '',
    computer_case: '',
    img: '',
    description: ''
  };

  constructor(private activeRoute: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;
    if (!this.id) {
      console.error('ID липсва в URL-а.');
      return;
    }

    this.postService.getConfiguration(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.configuration = config;
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
