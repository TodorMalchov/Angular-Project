import {Injectable, inject, signal } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

firebaseAuth = inject(Auth)
// user$ = user(this.firebaseAuth)
// currentUserSignal = signal<UserInterface | null | undefined>(undefined)
user$: Observable<any>


constructor(private fireAuth: AngularFireAuth, private router: Router) { 
  this.user$ = this.fireAuth.authState
}

register(email:string,username:string,password:string):Observable<void>{
  const promise = createUserWithEmailAndPassword(
    this.firebaseAuth,
    email,
    password
    ).then(response => updateProfile(response.user, {displayName: username}))

    return from(promise)
}
login(email:string, password: string):Observable<void>{
  const promise = signInWithEmailAndPassword(
    this.firebaseAuth,
    email,
    password).then(()=>{
      this.router.navigate(['/main'])
    },err=>{
      if(email == ''){
        alert('Нещо се обърка, !')
      }else{
        alert('Грешен имайл или парола!')
          this.router.navigate(['/login'])
        }
    })

    return from(promise)
}

  logout():Observable<void>{
    const promise = signOut(this.firebaseAuth)
    return from(promise)
  }
}
