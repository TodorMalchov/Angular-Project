import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-memories',
  templateUrl: './add-memories.component.html',
  styleUrls: ['./add-memories.component.css']
})
export class AddMemoriesComponent implements OnInit {
  private collection: string = ''
  public memorieForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private memoriesId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.memorieForm = this.fb.group({
      id: [''],
      memorieModel: ['', [Validators.required]],
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
      this.getComponentService.getMemorieById(this.memoriesId).subscribe((memo) => {
        this.memorieForm.patchValue(memo); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'memories'
    if (this.memorieForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.memoriesId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.memoriesId,
          ...this.memorieForm.value,
        })
        .then(() => {
          this.router.navigate(['/memories']);
        })
        .catch((error) => {
          console.error('Error updating memories:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addMemories(this.memorieForm.value)
        .then(() => {
          this.router.navigate(['/memories']);
        })
        .catch((error) => {
          console.error('Error adding memoriess:', error);
        });
    }
  }
}
