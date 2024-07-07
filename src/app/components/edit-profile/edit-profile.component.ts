import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  @Input()
  user:any;
  userForm!:FormGroup;
  constructor(private formBuilder:FormBuilder){}
  @Output() emitUpdateForm = new EventEmitter();
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name:[this.user.name],
      email:[this.user.email],
      phone_number:[this.user.phone_number],
      isTrue:[this.user.allow_late_calls]
    }); 
  }

  submitForm():void{
    console.log(this.userForm.value)
    // if(this.userForm.invalid){
    //   return;
    // }
    this.emitUpdateForm.emit(this.userForm.value);
  }
}
