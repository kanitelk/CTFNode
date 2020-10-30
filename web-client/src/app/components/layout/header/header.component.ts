import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/AuthService/auth.service';

interface MenuItem {
  name: string;
  link: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title = 'CTF Node';

  public menu: MenuItem[] = [
    {name: 'Home', link: ''},
    {name: 'Login', link: '/login'}
  ]

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
