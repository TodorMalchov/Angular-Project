import { Component } from '@angular/core';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent {
  public caseForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.caseForm= this.fb.group({
      id: [''],
      caseModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  createCase(): void{
    if(this.caseForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addCase(this.caseForm.value)
    this.router.navigate(['/computer_case'])
  }

}
