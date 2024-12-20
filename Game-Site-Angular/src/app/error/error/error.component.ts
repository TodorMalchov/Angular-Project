import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string = 'Страницата не е намерена!';
  constructor(private router: Router){}

  goHome(){
    this.router.navigate(['/home'])
  }
}
