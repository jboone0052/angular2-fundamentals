import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../shared/toastr.service';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private _auth: AuthService, private _router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

    profileForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    ngOnInit() {
      this.firstName = new FormControl(this._auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
      this.lastName = new FormControl(this._auth.currentUser.lastName, Validators.required);
      this.profileForm = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      });
    }

    saveProfile(formValues){
      if (this.profileForm.valid){
        this._auth.updateUser(formValues.firstName, formValues.lastName).subscribe(() => {
          this.toastr.success('Profile saved!');
        });
      }
    }

    logout() {
      this._auth.logout().subscribe(() => {
        this._router.navigate(['/user/login']);
      });
    }

    cancel() {
      this._router.navigate(['events']);
    }

    validateFirstName() {
      return this.firstName.valid || this.firstName.untouched
    }

    validateLastName() {
      return this.lastName.valid || this.lastName.untouched
    }
}