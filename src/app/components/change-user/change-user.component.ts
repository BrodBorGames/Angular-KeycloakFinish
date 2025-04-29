import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model'; // интерфейс пользователя
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-user.component.html',
  styleUrl: './change-user.component.scss'
})
export class ChangeUserComponent implements OnInit{
  users: User[] = [];
  userForm!: FormGroup;
  selectedUserId: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.loadUsers();

    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      telephone: ['', Validators.required],
      collegeID: ['', Validators.required]
    });
  }

  async loadUsers() {
    this.userService.listUserHttp().subscribe(users => {
      this.users = users;
    });
    // this.users = await this.userService.listUserHttp()
  }

  onUserSelect(event: any) {
    const userId = event.target.value;
    this.userService.getUserById(userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe(response => {
        console.log('User обновлен', response);
      });
    }
  }
  deleteUser(){
    console.log("Сработало удаление")
    if(this.userForm.valid){
      this.userService.deleteUser(this.userForm.value).subscribe(
        respose =>
          console.log('User удалён', respose)
      )
    }
  }
}
