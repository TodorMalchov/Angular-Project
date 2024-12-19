import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetComponentService } from '../../get-component.service';
import { AddComponentsService } from '../../add-components.service';

@Component({
  selector: 'app-add-video-cards',
  templateUrl: './add-video-cards.component.html',
  styleUrls: ['./add-video-cards.component.css']
})
export class AddVideoCardsComponent implements OnInit {
  private collection: string = ''
  public videoCardForm: FormGroup;
  public isEditMode = false; // Флаг за режима
  private videoCardId: string | null = null;

  constructor(
    private getComponentService: GetComponentService,
    private addComponents: AddComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.videoCardForm = this.fb.group({
      id: [''],
      videoCardModel: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Проверка за ID в URL
    this.videoCardId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.videoCardId;

    if (this.isEditMode && this.videoCardId) {
      // Зареждане на съществуващата видеокарта
      this.getComponentService.getVideoCardById(this.videoCardId).subscribe((videoCard) => {
        this.videoCardForm.patchValue(videoCard); // Попълване на формата с данни
      });
    }
  }

  createOrUpdateVideoCard(): void {
    this.collection = 'video-card'
    if (this.videoCardForm.invalid) {
      alert('Трябва да попълните всички полета');
      return;
    }

    if (this.isEditMode && this.videoCardId) {
      // Режим "Редакция"
      this.getComponentService
        .updateComponent(this.collection,{
          id: this.videoCardId,
          ...this.videoCardForm.value,
        })
        .then(() => {
          this.router.navigate(['/video-cards']);
        })
        .catch((error) => {
          console.error('Error updating video card:', error);
        });
    } else {
      // Режим "Добавяне"
      this.addComponents
        .addVideoCard(this.videoCardForm.value)
        .then(() => {
          this.router.navigate(['/video-cards']);
        })
        .catch((error) => {
          console.error('Error adding video card:', error);
        });
    }
  }
}
