// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { PostService } from 'src/app/posts/post.service';

// @Component({
//   selector: 'app-add-configuration',
//   templateUrl: './add-configuration.component.html',
//   styleUrls: ['./add-configuration.component.css']
// })
// export class AddConfigurationComponent {

//   public configurationForm: FormGroup

//   constructor(private postService: PostService, private router: Router, private fb: FormBuilder){
//     this.configurationForm = this.fb.group({
//       id: [''],
//       procesors: ['',[Validators.required]],
//       video_cart: ['',[Validators.required]],
//       ram_memories: ['',[Validators.required]],
//       mother_board: ['',[Validators.required]],
//       memories: ['',[Validators.required]],
//       power_supply: ['',[Validators.required]],
//       cooling: ['',[Validators.required]],
//       computer_case: ['',[Validators.required]],
//       img: ['',[Validators.required]],
//       description: ['',[Validators.required]]
//   })

//   }

//   createConfiguraton(): void{
//     if(this.configurationForm.invalid){
//       alert('Трябва да попълните всички полета')
//       return
//     }

//     this.postService.addConfiguration(this.configurationForm.value)
//     this.router.navigate(['/configurations'])
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-add-configuration',
  templateUrl: './add-configuration.component.html',
  styleUrls: ['./add-configuration.component.css']
})
export class AddConfigurationComponent implements OnInit {

  public configurationForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private configurationId: string | null = null;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.configurationForm = this.fb.group({
      id: [''],
      procesors: ['', [Validators.required]],
      video_cart: ['', [Validators.required]],
      ram_memories: ['', [Validators.required]],
      mother_board: ['', [Validators.required]],
      memories: ['', [Validators.required]],
      power_supply: ['', [Validators.required]],
      cooling: ['', [Validators.required]],
      computer_case: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.configurationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.configurationId;

    if (this.isEditMode && this.configurationId) {
      // Зареждане на съществуваща конфигурация
      this.postService.getConfiguration(this.configurationId).subscribe((config) => {
        this.configurationForm.patchValue(config); // Попълни формата с данните
      });
    }
  }

  createOrUpdateConfiguration(): void {
    if (this.configurationForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }
  
    if (this.isEditMode && this.configurationId) {
      // Режим "Редакция"
      this.postService
        .updateConfiguration({
          id: this.configurationId,
          ...this.configurationForm.value
        })
        .then(() => {
          this.router.navigate(['/configurations']);
        })
        .catch((error) => {
          console.error('Error updating configuration:', error);
        });
    } else {
      // Режим "Добавяне"
      this.postService
        .addConfiguration(this.configurationForm.value)
        .then(() => {
          this.router.navigate(['/configurations']);
        })
        .catch((error) => {
          console.error('Error adding configuration:', error);
        });
    }
  }
}  
