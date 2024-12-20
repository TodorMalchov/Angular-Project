import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Configurations } from '../shared/types/configurations';
import { map, Observable } from 'rxjs';

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
      this.router.navigate(['/configurations'])
    })

  }
  getConfigurations(){
    return this.angularFireStore.collection('computers').snapshotChanges()
  }


  getConfiguration(id: string): Observable<Configurations> {
    return this.angularFireStore.doc<Configurations>(`/computers/${id}`)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (!action.payload.exists) {
            console.warn(`Конфигурация с ID ${id} не съществува.`);
            return {
              id: '',
              procesors: '',
              video_cart: '',
              ram_memories: '',
              mother_board: '',
              memories: '',
              power_supply: '',
              cooling: '',
              computer_case: '',
              img: '',
              description: ''
            } as Configurations;
          } else {
            const data = action.payload.data() as Configurations;
            return { ...data, id: action.payload.id };
          }
        })
      );
  }
  
  updateConfiguration(configuration: any) {
    return this.angularFireStore.collection('computers').doc(configuration.id).update(configuration);
  }

  deleteConfiguration(id: string): Observable<void> {
    return new Observable((observer) => {
      this.angularFireStore.collection('computers').doc(id).delete().then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
