import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Case, Cooling, Memories, MotherBoard, PowerSupply, Procesor, Ram, VideoCard } from '../shared/types/components';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetComponentService {

  constructor(private angularFireStore: AngularFirestore) { }

   getCaseById(id: string): Observable<Case> {
      return this.angularFireStore.doc<Case>(`/cases/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                caseModel: '',
                img: '',
                description: ''
              } as Case;
            } else {
              const data = action.payload.data() as Case;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getCoolingById(id: string): Observable<Cooling> {
      return this.angularFireStore.doc<Case>(`/cooling/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                coolerModel: '',
                img: '',
                description: ''
              } as Cooling;
            } else {
              const data = action.payload.data() as Cooling;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getMemorieById(id: string): Observable<Memories> {
      return this.angularFireStore.doc<Case>(`/memories/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                memorieModel: '',
                img: '',
                description: ''
              } as Memories;
            } else {
              const data = action.payload.data() as Memories;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getMotherBordById(id: string): Observable<MotherBoard> {
      return this.angularFireStore.doc<Case>(`/mother-boards/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                motherBoardModel: '',
                img: '',
                description: ''
              } as MotherBoard;
            } else {
              const data = action.payload.data() as MotherBoard;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getPowerSupplyById(id: string): Observable<PowerSupply> {
      return this.angularFireStore.doc<Case>(`/power-supply/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                powerSupplyModel: '',
                img: '',
                description: ''
              } as PowerSupply;
            } else {
              const data = action.payload.data() as PowerSupply;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getProcesorById(id: string): Observable<Procesor> {
      return this.angularFireStore.doc<Case>(`/procesors/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                procesorModel: '',
                img: '',
                description: ''
              } as Procesor;
            } else {
              const data = action.payload.data() as Procesor;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getRamById(id: string): Observable<Ram> {
      return this.angularFireStore.doc<Case>(`/ram/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                ramModel: '',
                img: '',
                description: ''
              } as Ram;
            } else {
              const data = action.payload.data() as Ram;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
    getVideoCardById(id: string): Observable<VideoCard> {
      return this.angularFireStore.doc<Case>(`/video-card/${id}`)
        .snapshotChanges()
        .pipe(
          map((action: any) => {
            if (!action.payload.exists) {
              console.warn(`Конфигурация с ID ${id} не съществува.`);
              return {
                id: '',
                videoCardModel: '',
                img: '',
                description: ''
              } as VideoCard;
            } else {
              const data = action.payload.data() as VideoCard;
              return { ...data, id: action.payload.id };
            }
          })
        );
    }
}
