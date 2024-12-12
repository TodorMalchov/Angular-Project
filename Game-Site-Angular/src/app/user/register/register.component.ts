import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/utils/passwor-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['',[Validators.required]],
    email: ['', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required, Validators.minLength(5)]],
    },{
      validators: [passwordValidator('password', 'rePassword')]
    })
  })

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router){}

  register(){
    if(this.form.invalid){
      return
    }
  }

}
