import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  menuVisible: boolean;
  loginVisible: boolean;

  constructor() { this.menuVisible = false; }

  hideMenu() {
    this.menuVisible = false;
  }
  showMenu() {
    this.menuVisible = true;
  }

  hideLoginForm() {
    this.loginVisible = false;
  }
  showLoginForm() {
    this.loginVisible = true;
  }
  toggleLoginForm() {
    this.loginVisible = !this.loginVisible;
  }

}
