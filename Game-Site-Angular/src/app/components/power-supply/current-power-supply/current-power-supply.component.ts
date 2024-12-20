import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerSupply } from 'src/app/shared/types/components';
import { DeleteComponentsService } from '../../delete-components.service';

@Component({
  selector: 'app-current-power-supply',
  templateUrl: './current-power-supply.component.html',
  styleUrls: ['./current-power-supply.component.css']
})
export class CurrentPowerSupplyComponent implements OnInit {
  collection: string = ''
id: string = ''
   powerSupply: PowerSupply = {
      id: '',
      powerSupplyModel: '',
      img: '',
      description: ''
    }

  constructor(private gts: GetComponentService,private activeRoute: ActivatedRoute,private deleteService: DeleteComponentsService, private router: Router){}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;
    if (!this.id) {
      console.error('ID липсва в URL-а.');
      return;
    }

    this.gts.getPowerSupplyById(this.id).subscribe({
      next: (config) => {
        if (config) {
          console.log('Конфигурация:', config);
          this.powerSupply = config;
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
      this.collection = 'power-supply'
      this.deleteService.deleteConfiguration(this.collection,id).subscribe(() => {
        // Пренасочване след изтриване
        this.router.navigate(['/power-supply']);
      }, error => {
        console.error('Грешка при изтриването на елемента:', error);
      });
    }
  }
}
