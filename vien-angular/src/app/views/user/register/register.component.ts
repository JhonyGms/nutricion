import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  async onSubmit() {
    if (this.registerForm.valid && !this.buttonDisabled) {
      this.buttonDisabled = true;
      this.buttonState = 'show-spinner';
      await this.authService.register(this.registerForm.value).subscribe(
        async (user) => {
          await localStorage.setItem('token', user.token);
          await localStorage.setItem('role', user.role);
          await localStorage.setItem('displayName', user.displayName);
          await this.router.navigate([environment.adminRoot]);
        },
        (error) => {
          this.notifications.create(
            'Error',
            error.message,
            NotificationType.Bare,
            {
              theClass: 'outline primary',
              timeOut: 6000,
              showProgressBar: false,
            }
          );
          this.buttonDisabled = false;
          this.buttonState = '';
        }
      );
    }
  }
}
