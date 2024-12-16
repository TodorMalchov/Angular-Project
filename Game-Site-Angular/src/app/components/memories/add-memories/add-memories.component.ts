import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-memories',
  templateUrl: './add-memories.component.html',
  styleUrls: ['./add-memories.component.css']
})
export class AddMemoriesComponent {
public memorieForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.memorieForm= this.fb.group({
      id: ['',[Validators.required]],
      memorieModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  createMemories(): void{
    if(this.memorieForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addMemories(this.memorieForm.value)
    this.router.navigate(['/main'])
  }
}
