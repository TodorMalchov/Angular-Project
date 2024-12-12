import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Configurations } from '../shared/types/configurations';
import { Components } from '../shared/types/components';

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



  addComponent(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('parts').add(components)
  }

  getComponent(){
    return this.angularFireStore.collection('parts').snapshotChanges()
  }

  updateComponent(components: Components){
    this.deleteComponent(components)
    this.addComponent(components)
  }

  deleteComponent(components: Components){
    this.angularFireStore.doc(`parts/${components.id}`).delete()
  }
}
