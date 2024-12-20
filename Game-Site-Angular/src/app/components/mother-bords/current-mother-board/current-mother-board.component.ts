import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotherBoard } from 'src/app/shared/types/components';
import { DeleteComponentsService } from '../../delete-components.service';

@Component({
  selector: 'app-current-mother-board',
  templateUrl: './current-mother-board.component.html',
  styleUrls: ['./current-mother-board.component.css']
})
export class CurrentMotherBoardComponent implements OnInit {
  collection: string = ''
id: string = ''
   motherBoard: MotherBoard = {
      id: '',
      motherBoardModel: '',
      img: '',
      description: ''
    }

  constructor(private gts: GetComponentService,private activeRoute: ActivatedRoute, private deleteService: DeleteComponentsService,private router:Router){}

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
  deleteConfiguration(id: string): void {
    if (confirm('Сигурни ли сте, че искате да изтриете този елемент?')) {
      this.collection = 'mother-boards'
      this.deleteService.deleteConfiguration(this.collection,id).subscribe(() => {
        // Пренасочване след изтриване
        this.router.navigate(['/mother-bords']);
      }, error => {
        console.error('Грешка при изтриването на елемента:', error);
      });
    }
  }
}