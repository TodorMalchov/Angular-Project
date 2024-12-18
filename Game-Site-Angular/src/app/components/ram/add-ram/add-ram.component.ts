import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ram',
  templateUrl: './add-ram.component.html',
  styleUrls: ['./add-ram.component.css']
})
export class AddRamComponent {
public ramForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.ramForm= this.fb.group({
      id: [''],
      ramModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  createRam(): void{
    if(this.ramForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addRam(this.ramForm.value)
    this.router.navigate(['/ram'])
  }
}
