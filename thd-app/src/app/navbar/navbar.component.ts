import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'

/**
 *navigation bar class which holds the code for navbar component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  /**
   * a constructor to create new instance of this class
   * @param authService: this serivce will be used in the html to check if the user is authenticated 
   */
  constructor(public authService:AuthService) {}

  /**
   * This method is executed after the constructor is executed
   */
  ngOnInit() {}
}
