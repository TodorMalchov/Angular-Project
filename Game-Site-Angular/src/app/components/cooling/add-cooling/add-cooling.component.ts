import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-cooling',
  templateUrl: './add-cooling.component.html',
  styleUrls: ['./add-cooling.component.css']
})
export class AddCoolingComponent implements OnInit {
  private collection: string = ''
  public coolingForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private memoriesId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.coolingForm = this.fb.group({
      id: [''],
      coolerModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.memoriesId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.memoriesId;

    if (this.isEditMode && this.memoriesId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getCoolingById(this.memoriesId).subscribe((cooler) => {
        this.coolingForm.patchValue(cooler); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'cooling'
    if (this.coolingForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.memoriesId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.memoriesId,
          ...this.coolingForm.value,
        })
        .then(() => {
          this.router.navigate(['/cooling']);
        })
        .catch((error) => {
          console.error('Error updating cooling:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addCooling(this.coolingForm.value)
        .then(() => {
          this.router.navigate(['/cooling']);
        })
        .catch((error) => {
          console.error('Error adding cooling:', error);
        });
    }
  }
}
