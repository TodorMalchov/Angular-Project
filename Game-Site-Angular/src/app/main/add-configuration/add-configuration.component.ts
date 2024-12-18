import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-add-configuration',
  templateUrl: './add-configuration.component.html',
  styleUrls: ['./add-configuration.component.css']
})
export class AddConfigurationComponent {

  public configurationForm: FormGroup

  constructor(private postService: PostService, private router: Router, private fb: FormBuilder){
    this.configurationForm = this.fb.group({
      id: [''],
      procesors: ['',[Validators.required]],
      video_cart: ['',[Validators.required]],
      ram_memories: ['',[Validators.required]],
      mother_board: ['',[Validators.required]],
      memories: ['',[Validators.required]],
      power_supply: ['',[Validators.required]],
      cooling: ['',[Validators.required]],
      computer_case: ['',[Validators.required]],
      img: ['',[Validators.required]],
      description: ['',[Validators.required]]
  })

  }

  createConfiguraton(): void{
    if(this.configurationForm.invalid){
      alert('Трябва да попълните всички полета')
      return
    }

    this.postService.addConfiguration(this.configurationForm.value)
    this.router.navigate(['/configurations'])
  }

}
