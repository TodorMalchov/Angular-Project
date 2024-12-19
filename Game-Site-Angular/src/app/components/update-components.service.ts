import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }




  
}