import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }



  // deleteComponent(components: Components){
  //   this.angularFireStore.doc(`parts/${components.id}`).delete()
  // }
}