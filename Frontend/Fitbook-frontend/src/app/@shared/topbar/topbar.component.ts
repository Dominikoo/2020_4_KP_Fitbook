import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopbarComponent implements OnInit {
  isCollapsed = true;

  form = new FormGroup({
    searchText: new FormControl('')
  });
  
  constructor(private router: Router,
              private wallService: WallService) { }

  ngOnInit() {
    this.form.controls.searchText.setValue('');
  }

  accountManagement(): void {
    this.router.navigate(['/pages/acc-manage']);
  }

  isTokenSet(): boolean {
    return localStorage.getItem('token') !== '';
  }

  isAdmin(): boolean{
    return localStorage.getItem('isAdmin') == 'true';
  }

  search(): void{
    localStorage.setItem('phrase', this.form.controls.searchText.value)
    if(this.router.url == '/pages/search-results') window.location.reload();
    this.router.navigate(['/pages/search-results']);
  }

  logout(){
    this.router.navigate(['']);
  }

  topbarNavigate(path): void {
    this.wallService.loadContent(-1);
    this.router.navigate([path]);
  }
}
