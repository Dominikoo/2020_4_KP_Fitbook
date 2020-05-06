import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  accountManagement(): void {
    this.router.navigate(['/pages/acc-manage']);
  }

  isTokenSet(): boolean {
    return localStorage.getItem('token') !== '';
  }

  isAdmin(): boolean{
    console.log('X' + localStorage.getItem('isAdmin'))
    return localStorage.getItem('isAdmin') == 'true';
  }
}
