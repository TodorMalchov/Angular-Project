import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activeRoute: ActivatedRoute, private postService: PostService,private router: Router) {}

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

  deleteConfiguration(id: string): void {
    if (confirm('Сигурни ли сте, че искате да изтриете този елемент?')) {
      this.postService.deleteConfiguration(id).subscribe(() => {
        // Пренасочване след изтриване
        this.router.navigate(['/configurations']);
      }, error => {
        console.error('Грешка при изтриването на елемента:', error);
      });
    }
  }

}
