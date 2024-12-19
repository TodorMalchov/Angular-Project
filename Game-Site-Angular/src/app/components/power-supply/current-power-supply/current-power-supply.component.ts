import { Component, OnInit } from '@angular/core';
import { GetComponentService } from '../../get-component.service';
import { ActivatedRoute } from '@angular/router';
import { PowerSupply } from 'src/app/shared/types/components';

@Component({
  selector: 'app-current-power-supply',
  templateUrl: './current-power-supply.component.html',
  styleUrls: ['./current-power-supply.component.css']
})
export class CurrentPowerSupplyComponent implements OnInit {
id: string = ''
   powerSupply: PowerSupply = {
      id: '',
      powerSupplyModel: '',
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
}
