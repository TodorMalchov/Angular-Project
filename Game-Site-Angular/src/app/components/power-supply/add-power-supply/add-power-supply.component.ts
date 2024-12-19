import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-power-supply',
  templateUrl: './add-power-supply.component.html',
  styleUrls: ['./add-power-supply.component.css']
})
export class AddPowerSupplyComponent implements OnInit {
  private collection: string = ''
  public powerSupplyForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private powerSupplyId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.powerSupplyForm = this.fb.group({
      id: [''],
      powerSupplyModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.powerSupplyId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.powerSupplyId;

    if (this.isEditMode && this.powerSupplyId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getPowerSupplyById(this.powerSupplyId).subscribe((ps) => {
        this.powerSupplyForm.patchValue(ps); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'power-supply'
    if (this.powerSupplyForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.powerSupplyId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.powerSupplyId,
          ...this.powerSupplyForm.value,
        })
        .then(() => {
          this.router.navigate(['/power-supply']);
        })
        .catch((error) => {
          console.error('Error updating power-supply:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addPowerSupply(this.powerSupplyForm.value)
        .then(() => {
          this.router.navigate(['/power-supply']);
        })
        .catch((error) => {
          console.error('Error adding power-supply:', error);
        });
    }
  }
}

