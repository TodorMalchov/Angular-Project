import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cooling } from 'src/app/shared/types/components';
import { DeleteComponentsService } from '../../delete-components.service';

@Component({
  selector: 'app-current-cooling',
  templateUrl: './current-cooling.component.html',
  styleUrls: ['./current-cooling.component.css']
})
export class CurrentCoolingComponent implements OnInit {
  collection:string =''
id: string = ''
   cooler: Cooling = {
      id: '',
      coolerModel: '',
      img: '',
      description: ''
    }

  constructor(private gts: GetComponentService,private activeRoute: ActivatedRoute,private deleteService: DeleteComponentsService,private router: Router){}

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
  deleteConfiguration(id: string): void {
    if (confirm('Сигурни ли сте, че искате да изтриете този елемент?')) {
      this.collection = 'cooling'
      this.deleteService.deleteConfiguration(this.collection,id).subscribe(() => {
        // Пренасочване след изтриване
        this.router.navigate(['/cooling']);
      }, error => {
        console.error('Грешка при изтриването на елемента:', error);
      });
    }
  }
}

