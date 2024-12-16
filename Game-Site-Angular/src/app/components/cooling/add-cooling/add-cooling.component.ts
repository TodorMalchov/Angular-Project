import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cooling',
  templateUrl: './add-cooling.component.html',
  styleUrls: ['./add-cooling.component.css']
})
export class AddCoolingComponent {
public coolingForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.coolingForm= this.fb.group({
      id: ['',[Validators.required]],
      procesorModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  createCooling(): void{
    if(this.coolingForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addCooling(this.coolingForm.value)
    this.router.navigate(['/main'])
  }
}
