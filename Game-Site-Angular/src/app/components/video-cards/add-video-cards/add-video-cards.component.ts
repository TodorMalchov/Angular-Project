import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-video-cards',
  templateUrl: './add-video-cards.component.html',
  styleUrls: ['./add-video-cards.component.css']
})
export class AddVideoCardsComponent {
public videoCardForm: FormGroup

  constructor(private addComponentService: AddComponentsService, private router: Router, private fb: FormBuilder){
    this.videoCardForm= this.fb.group({
      id: ['',[Validators.required]],
      videoCardModel: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  createVideoCard(): void{
    if(this.videoCardForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.addComponentService.addVideoCard(this.videoCardForm.value)
    this.router.navigate(['/main'])
  }
}
