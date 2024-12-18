import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-procesors',
  templateUrl: './add-procesors.component.html',
  styleUrls: ['./add-procesors.component.css']
})
export class AddProcesorsComponent {
  public procesorForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.procesorForm= this.fb.group({
      id: ['',],
      procesorModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  createProcesor(): void{
    console.log(this.procesorForm.value)
    if(this.procesorForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addProcesor(this.procesorForm.value)
    this.router.navigate(['/procesors'])
  }

}
