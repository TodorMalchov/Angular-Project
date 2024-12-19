import {Injectable, inject, signal } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

firebaseAuth = inject(Auth)
// user$ = user(this.firebaseAuth)
// currentUserSignal = signal<UserInterface | null | undefined>(undefined)
user$: Observable<any>

private isAdminSubject = new BehaviorSubject<boolean>(false);
isAdmin$ = this.isAdminSubject.asObservable();


constructor(private fireAuth: AngularFireAuth, private router: Router) { 
  this.user$ = this.fireAuth.authState
  this.fireAuth.authState.subscribe((user) => {
    const isAdmin = user?.email === 'pesho@gmail.com';
    this.isAdminSubject.next(isAdmin);
  })
}

isAdmin: boolean = false

// checkAdminPrivileges(): Observable<boolean> {
//   return new Observable<boolean>((observer) => {
//     this.fireAuth.authState.subscribe((user) => {
//       if (user && user.email === 'pesho@gmail.com') {
//         observer.next(true);
//       } else {
//         observer.next(false);
//       }
//       observer.complete();
//     });
//   });
// }

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
      this.router.navigate(['/configurations'])
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
    this.router.navigate(['/home'])
    return from(promise)
  }
}
