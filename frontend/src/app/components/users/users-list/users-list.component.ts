import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{
  constructor(private authService: AuthService){}
  ngOnInit() {
   this.authService.getUsers().subscribe(res => {
    console.log('ressss',res)
   })
  }

}
