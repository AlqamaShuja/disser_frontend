import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent {
  myForm: FormGroup;
  @Output() passUpdateForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
    this.myForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      retypePassword: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const newPassword = this.myForm.get("newPassword")!.value;
      const retypePassword = this.myForm.get("retypePassword")!.value;
      if (newPassword === retypePassword) {
        this.passUpdateForm.emit(this.myForm.value);
      } else {
        alert("New Password and Retype Password do not match.");
      }
    } else {
      alert("Error: Fill in all fields.");
    }
  }
}
