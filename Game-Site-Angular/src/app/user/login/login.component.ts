import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 form = this.fb.group({
  email:['',[Validators.required]],
  password: ['',[Validators.required, Validators.minLength(6)]],
 })

  constructor(private userService:  UserService, private fb: FormBuilder, private router: Router){}

  login():void{
    if(this.form.invalid){
      return
    }
    const{email,password} = this.form.value
    this.userService.login(email!,password!)
  }

}
