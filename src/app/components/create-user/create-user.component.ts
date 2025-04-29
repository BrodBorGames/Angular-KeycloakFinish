import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model'; // интерфейс пользователя
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      telephone: ['', Validators.required],
      collegeID: ['', Validators.required]
    });
  }




  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(response => {
        console.log('User создан', response);
      });
    }
  }

  
}
