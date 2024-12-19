import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }


  getProcesors(){
    return this.angularFireStore.collection('procesors').snapshotChanges()
  }

  getVideoCards(){
    return this.angularFireStore.collection('video-card').snapshotChanges()
  }
  getRam(){
    return this.angularFireStore.collection('ram').snapshotChanges()
  }
  getMemories(){
    return this.angularFireStore.collection('memories').snapshotChanges()
  }
  getMotherBoards(){
    return this.angularFireStore.collection('mother-boards').snapshotChanges()
  }
  getPowerSupply(){
    return this.angularFireStore.collection('power-supply').snapshotChanges()
  }
  getCases(){
    return this.angularFireStore.collection('cases').snapshotChanges()
  }
  getCooling(){
    return this.angularFireStore.collection('cooling').snapshotChanges()
  }

  

}