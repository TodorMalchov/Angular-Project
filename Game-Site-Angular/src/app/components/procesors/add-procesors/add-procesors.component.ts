import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-procesors',
  templateUrl: './add-procesors.component.html',
  styleUrls: ['./add-procesors.component.css']
})
export class AddProcesorsComponent implements OnInit {
  private collection: string = ''
  public procesorForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private procesorId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.procesorForm = this.fb.group({
      id: [''],
      procesorModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.procesorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.procesorId;
    console.log(this.procesorId)

    if (this.isEditMode && this.procesorId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getProcesorById(this.procesorId).subscribe((procesor) => {
        this.procesorForm.patchValue(procesor); // Попълване на формата с данни
      });
    }
  }

  createOrUpdateProcesor(): void {
    this.collection = 'procesors'
    if (this.procesorForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.procesorId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.procesorId,
          ...this.procesorForm.value,
        })
        .then(() => {
          this.router.navigate(['/procesors']);
        })
        .catch((error) => {
          console.error('Error updating procesors:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addProcesor(this.procesorForm.value)
        .then(() => {
          this.router.navigate(['/procesors']);
        })
        .catch((error) => {
          console.error('Error adding procesors:', error);
        });
    }
  }
}
