import { Component, OnInit } from '@angular/core';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {
  private collection: string = ''
  public caseForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private caseId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.caseForm = this.fb.group({
      id: [''],
      caseModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.caseId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.caseId;

    if (this.isEditMode && this.caseId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getCaseById(this.caseId).subscribe((c) => {
        this.caseForm.patchValue(c); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'cases'
    if (this.caseForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.caseId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.caseId,
          ...this.caseForm.value,
        })
        .then(() => {
          this.router.navigate(['/computer_case']);
        })
        .catch((error) => {
          console.error('Error updating cases:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addCase(this.caseForm.value)
        .then(() => {
          this.router.navigate(['/computer_case']);
        })
        .catch((error) => {
          console.error('Error adding cases:', error);
        });
    }
  }
}

