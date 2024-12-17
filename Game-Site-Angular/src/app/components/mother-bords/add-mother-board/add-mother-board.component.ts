import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-mother-board',
  templateUrl: './add-mother-board.component.html',
  styleUrls: ['./add-mother-board.component.css']
})
export class AddMotherBoardComponent {
public motherBoardForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.motherBoardForm= this.fb.group({
      id: [''],
      motherBoardModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  createMotherBoard(): void{
    if(this.motherBoardForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addMotherBoard(this.motherBoardForm.value)
    this.router.navigate(['/main'])
  }
}
