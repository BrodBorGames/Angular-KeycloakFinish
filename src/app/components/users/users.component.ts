import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { JsonPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users',
  imports: [ UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] =[];
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    // this.users = await this.usersService.listUser()
    this.usersService.listUsersWithCollege()
    .subscribe((data) =>{
      console.log("Сработала функция")
      console.log(data);
      this.users = data;
    })
  }
}
