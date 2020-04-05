import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { AuthManager } from 'src/app/auth/auth.manager';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router, private authManager: AuthManager) { }

  ngOnInit() {
  }

  accountManagement(): void {
    this.router.navigate(['/pages/acc-manage']);
  }

  isTokenSet(): boolean {
    return this.authManager.getToken() !== '';
  }
}
