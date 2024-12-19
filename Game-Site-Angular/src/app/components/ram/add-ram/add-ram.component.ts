import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-ram',
  templateUrl: './add-ram.component.html',
  styleUrls: ['./add-ram.component.css']
})
export class AddRamComponent implements OnInit {
  private collection: string = ''
  public ramForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private ramId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.ramForm = this.fb.group({
      id: [''],
      ramModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.ramId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.ramId;

    if (this.isEditMode && this.ramId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getRamById(this.ramId).subscribe((ram) => {
        this.ramForm.patchValue(ram); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'ram'
    if (this.ramForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.ramId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.ramId,
          ...this.ramForm.value,
        })
        .then(() => {
          this.router.navigate(['/ram']);
        })
        .catch((error) => {
          console.error('Error updating ram:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addRam(this.ramForm.value)
        .then(() => {
          this.router.navigate(['/ram']);
        })
        .catch((error) => {
          console.error('Error adding ram:', error);
        });
    }
  }
}
