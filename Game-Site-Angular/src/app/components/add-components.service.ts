import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Components } from '../shared/types/components';

@Injectable({
  providedIn: 'root'
})
export class AddComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }




  addProcesor(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('procesors').add(components)
  }

  addVideoCard(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('video-card').add(components)
  }

  addRam(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('ram').add(components)
  }

  addMemories(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('memories').add(components)
  }

  addMotherBoard(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('mother-boards').add(components)
  }

  addPowerSupply(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('power-supply').add(components)
  }

  addCase(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('cases').add(components)
  }

  addCooling(components: Components){
    components.id = this.angularFireStore.createId()
    return this.angularFireStore.collection('cooling').add(components)
  }

}
