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
    username: ['',[Validators.required, Validators.minLength(5)]],
    email: ['',[Validators.required]],
    passGroup: this.fb.group({
      password: ['',[Validators.required, Validators.minLength(6)]],
      rePassword: ['',[Validators.required, Validators.minLength(6)]],
    },{
      validators: [passwordValidator('password', 'rePassword')]
    })
  })

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router){}
  
  
  register(){
    if(this.form.invalid){
      return
    }
    const {
      username,
      email,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    this.userService.register(email!,username!,password!).subscribe({next:()=>{
      this.router.navigate(['/'])
    },error(err) {
      alert('Имейла не е валиден или вече съществува')
    },
  })
    
  }

}


// firebaseAuth = inject(Auth)

// register(email:string,username:string,password:string):Observable<void>{
//   const promise = createUserWithEmailAndPassword(
//     this.firebaseAuth,
//     email,
//     password
//     ).then(response => updateProfile(response.user, {displayName: username}))

//     return from(promise)
// }

// register(email: string, password: string, username: string):Observable<void>{
//   const promise = createUserWithEmailAndPassword(
//     this.fireAuth,
//     email,
//     password
//   ).then(response => updateProfile(response.user,{displayName:username}))
//   return from(promise)
// }
