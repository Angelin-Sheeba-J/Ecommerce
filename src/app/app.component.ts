import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecommercemap';
  roleId: number | null = null;
  isLoggedIn: boolean = false;
  isHiddenPage: boolean = false;
  constructor(private router: Router,private userservice:UserService) {}
  ngOnInit(): void {
    // this.roleId = Number(sessionStorage.getItem('roleId')) || null;
    // this.isLoggedIn = !!sessionStorage.getItem('token');
    this.userservice.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.roleId = Number(sessionStorage.getItem('roleId')) || null;
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      const hiddenRoutes = ['/home', '/login']; // Add routes where navbar should be hidden
      this.isHiddenPage = hiddenRoutes.includes(event.url);
    });
  }
  logout() {
    // sessionStorage.clear();
    // this.isLoggedIn = false;
    // this.router.navigate(['/login']);
    this.userservice.logout();
    this.router.navigate(['/login']);
  }
}
