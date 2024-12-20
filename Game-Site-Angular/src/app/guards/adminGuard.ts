import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    return this.userService.isAdmin$.pipe(map((isAdmin) => isAdmin));
  }
}