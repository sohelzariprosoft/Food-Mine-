import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageUserToken } from 'src/app/Shared/constants/UserConstants';
import { AlertService } from 'src/app/Shared/Services/alert.service';
import { UserService } from 'src/app/Shared/Services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.userService.loginUser(formData).subscribe({
        next: (data) => {
          if (data.success && data.loginUser) {
            localStorage.setItem(
              localStorageUserToken,
              JSON.stringify(data.loginUser.token)
            );
            //this.alertService.successAlert('Login Successfully.');
            this.router.navigateByUrl('/tabs/tab1');
          } else {
            //this.alertService.errorAlert('Login failed.');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

// {cell_id=1002614262,1002614523,10171,10516461,10516463,10516652,10530332,10541431,10545502,10545503,10545581,10564321,10564322,11512542,11512793,11515733,11619,1202510171,12491,12541,12542,12632,12732,13136,13311619,13351016,13365379,13613134,15282,15293,15461,15731,16031,16061,16091,16092,16652,17113,19731,20215461,20216371,20226352,2023921,20515821,20527011,20527012,21812,26363,27011,27012&
// circle=KOLKATA&
// spid=b7f98eac-5b49-46f6-ae44-c461c91ff2dd
// &spcountry=IN}

// {cell_id=1102114254,120117,120137,131412637,134817,134827,135617,138717017,139827017,14363270,14826030,159622230,1673110,2121,2306214255,230827,27226030,29811,29831,3731013,4044510113111,404451011314001,404451011314002,404451011314003,404451011351941,40445101351931,404451014641,404451014642,404451014643,404451020113281,404451020113283,404451020115733,404451020115751,404451020115752,40445102014352,40445102014353,40445102014452,40445102014453,40445102014721,40445102014722,40445102015081,40445102015082,40445102015083,404451022112202,404451022112203,40445102217261,40445102224011,40445102224042,40445102224241,4044510241341&circle=KARNATAKA&spid=b7f98eac-5b49-46f6-ae44-c461c91ff2dd &spcountry=IN}
