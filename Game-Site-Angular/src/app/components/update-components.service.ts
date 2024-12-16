import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }




  // addComponent(components: Components){
  //   components.id = this.angularFireStore.createId()
  //   return this.angularFireStore.collection('parts').add(components)
  // }

  // getComponent(){
  //   return this.angularFireStore.collection('parts').snapshotChanges()
  // }

  // updateComponent(components: Components){
  //   this.deleteComponent(components)
  //   this.addComponent(components)
  // }

  // deleteComponent(components: Components){
  //   this.angularFireStore.doc(`parts/${components.id}`).delete()
  // }
}