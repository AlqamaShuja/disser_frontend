import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  myForm: FormGroup;

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
        const payload = {
          newPassword:  newPassword,
          oldPassword: this.myForm.value.oldPassword
        }
        this.authService.changePassword(payload).subscribe(res => {
          alert('Password updated');
        })
      } else {
        alert("New Password and Retype Password do not match.");
      }
    } else {
      alert("Error: Fill in all fields.");
    }
  }
}
