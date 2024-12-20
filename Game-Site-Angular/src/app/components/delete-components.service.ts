import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteComponentsService {

  constructor(private angularFireStore: AngularFirestore, private router: Router) { }

  deleteConfiguration(collection: string,id: string): Observable<void> {
      return new Observable((observer) => {
        this.angularFireStore.collection(`${collection}`).doc(id).delete().then(() => {
          observer.next();
          observer.complete();
        }).catch(error => {
          observer.error(error);
        });
      });
    }


  
}