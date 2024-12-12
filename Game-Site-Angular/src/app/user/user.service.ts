import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then(()=>{
      localStorage.setItem('token','true')
      this.router.navigate(['/main'])
    }, err=>{
      if(email == ''){
        alert('Нещо се обърка, !')

      }else{
        alert('Грешен имайл или парола!')
        this.router.navigate(['/login'])
      }
    })
  }

  register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(()=>{
      alert('Регистрацията е успешна')
      this.router.navigate(['/login'])
    },err=>{
      alert('Нещо се обърка, опитай отново!')
      this.router.navigate(['/register'])
    })
  }

  logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/main'])
    },err=>{
      alert('Нещо се обърка, опитай отново!')
    })
  }
}
