import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() toggle = new EventEmitter<boolean>();
  authService = inject(AuthService);
  tostr = inject(ToastrService);
  isClosed = false;
  menuItems = [
    { label: 'Dashboard', icon: 'fas fa-chart-line', route: '/dashboard' },
    { label: 'Invoice', icon: 'fas fa-tasks', route: '/invoices' },
    { label: 'Customers', icon: 'fas fa-users', route: '/customers' },
    { label: 'Payments', icon: 'fas fa-credit-card', route: '/payments' },
    { label: 'Terms & Conditions', icon: 'fas fa-file-contract', route: '/terms&conditions' },
  ];

  ngOnInit() {}

  toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.toggle.emit(this.isClosed);
  }

  logOut() {
    this.tostr.success('Logout successful');
    this.authService.logout();
  }
}
