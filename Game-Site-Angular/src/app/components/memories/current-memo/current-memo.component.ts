import { Component, OnInit } from '@angular/core';
import { Memories } from 'src/app/shared/types/components';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteComponentsService } from '../../delete-components.service';

@Component({
  selector: 'app-current-memo',
  templateUrl: './current-memo.component.html',
  styleUrls: ['./current-memo.component.css']
})
export class CurrentMemoComponent implements OnInit {
  collection:string = ''
id: string = ''
   memorie: Memories = {
      id: '',
      memorieModel: '',
      img: '',
      description: ''
    }

  constructor(private gts: GetComponentService,private activeRoute: ActivatedRoute,private deleteService: DeleteComponentsService, private router:Router){}

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
  deleteConfiguration(id: string): void {
    if (confirm('Сигурни ли сте, че искате да изтриете този елемент?')) {
      this.collection = 'memories'
      this.deleteService.deleteConfiguration(this.collection,id).subscribe(() => {
        // Пренасочване след изтриване
        this.router.navigate(['/memories']);
      }, error => {
        console.error('Грешка при изтриването на елемента:', error);
      });
    }
  }
}
