import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-power-supply',
  templateUrl: './add-power-supply.component.html',
  styleUrls: ['./add-power-supply.component.css']
})
export class AddPowerSupplyComponent {
public powerSupplyForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.powerSupplyForm= this.fb.group({
      id: [''],
      powerSupplyModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  createPowerSupply(): void{
    if(this.powerSupplyForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addPowerSupply(this.powerSupplyForm.value)
    this.router.navigate(['/main'])
  }
}
