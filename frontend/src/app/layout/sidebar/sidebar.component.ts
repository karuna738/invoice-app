import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  @Output() toggle = new EventEmitter<boolean>();
  isClosed = false;
    menuItems = [
    // { label: 'Invoice', icon: 'fas fa-tachometer-alt', route: '/invoices' },
    { label: 'Tasks', icon: 'fas fa-tasks', route: '/invoices' },
    // { label: 'Users', icon: 'fas fa-users',  },
    // { label: 'Settings', icon: 'fas fa-cog',  },
  ];

    ngOnInit() {}

    toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.toggle.emit(this.isClosed);
  }
}
