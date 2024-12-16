import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Configurations } from '../shared/types/configurations';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }

  // addConfiguration(configurations: Configurations){
  //   configurations.id = this.angularFireStore.createId()
  //   return this.angularFireStore.collection('computers').add(configurations)
  // }
  addConfiguration(configurations: Configurations){
    configurations.id = this.angularFireStore.createId()
    return new Promise<Configurations>((resolve, reject)=>{
      this.angularFireStore.collection('computers').add(configurations).then(response => {console.log(response)}, err => reject)
    })

  }
  getConfigurations(){
    return this.angularFireStore.collection('computers').snapshotChanges()
  }
  
  updateConfigurations(configurations: Configurations){
    this.deleteConfigurations(configurations)
    this.addConfiguration(configurations)
  }

  deleteConfigurations(configurations: Configurations){
    return this.angularFireStore.doc(`computers/${configurations.id}`).delete()
  }

}
