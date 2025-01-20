import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageUserToken } from 'src/app/Shared/constants/UserConstants';
import { AlertService } from 'src/app/Shared/Services/alert.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false,
})
export class RegisterPageComponent {
  step: number = 1; // Step 1: User Info, Step 2: Address Info
  userInfoForm: FormGroup;
  addressInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialize User Info Form
    this.userInfoForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Initialize Address Info Form
    this.addressInfoForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)],
      ],
    });
  }

  // Custom Validator for Password Match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  // Navigation Between Steps
  goToStep(step: number) {
    this.step = step;
  }

  // Submit Form
  onSubmit() {
    if (this.userInfoForm.valid && this.addressInfoForm.valid) {
      const formData = {
        ...this.userInfoForm.value,
        ...this.addressInfoForm.value,
      };
      console.log(formData);
      const reqBody = {
        name: formData.name,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        state: formData.state,
        city: formData.city,
        workAreaPostalCode: formData.postalCode,
        phone: formData.mobile,
      };
      this.userService.registerUser(reqBody).subscribe({
        next: (data) => {
          if (data.success && data.newUser) {
            localStorage.setItem(
              localStorageUserToken,
              JSON.stringify(data.newUser.token)
            );
            this.alertService.successAlert('Register Successfully.');
            if (data.newUser.newDbUer.isAuthenticated) {
              this.router.navigateByUrl('/tabs/tab1');
            } else {
              this.alertService;
            }
          } else {
            this.alertService.errorAlert('Registeration failed.');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
