import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userId!:number;

  isMenuOpen: boolean = false;
  isMobile: boolean = false;
  isLoggedin: boolean = false;

  private subscription!: Subscription;

  constructor(
    private observer: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedin = this.userService.isLoggedIn();
    this.userId = this.userService.currentUserId;
  }

  ngAfterViewInit() {
    this.subscription = this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        this.isMobile = res.matches;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doLogout = () => {
    this.userService.deleteToken();
    this.router.navigate(['/']);
  };


  navigateToDashboard = () => {
    if (this.isLoggedin) {
      this.router.navigate(['/dashboard',this.userId]);
    } else {
      alert('Please login first to see dashboard');
    }
  };
}