import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddComponentsService } from '../../add-components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComponentService } from '../../get-component.service';

@Component({
  selector: 'app-add-mother-board',
  templateUrl: './add-mother-board.component.html',
  styleUrls: ['./add-mother-board.component.css']
})
export class AddMotherBoardComponent implements OnInit {
  private collection: string = ''
  public motherBoardForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private motherBoardId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.motherBoardForm = this.fb.group({
      id: [''],
      motherBoardModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.motherBoardId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.motherBoardId;

    if (this.isEditMode && this.motherBoardId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getMotherBordById(this.motherBoardId).subscribe((mb) => {
        this.motherBoardForm.patchValue(mb); // Попълване на формата с данни
      });
    }
  }

  createOrUpdate(): void {
    this.collection = 'mother-boards'
    if (this.motherBoardForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.motherBoardId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.motherBoardId,
          ...this.motherBoardForm.value,
        })
        .then(() => {
          this.router.navigate(['/mother-bords']);
        })
        .catch((error) => {
          console.error('Error updating mother-bords:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addMotherBoard(this.motherBoardForm.value)
        .then(() => {
          this.router.navigate(['/mother-bords']);
        })
        .catch((error) => {
          console.error('Error adding mother-bords:', error);
        });
    }
  }
}
