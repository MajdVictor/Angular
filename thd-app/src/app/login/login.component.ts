import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { NavbarComponent } from '../navbar/navbar.component'

/**
 * Login class which holds the code for login component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * string variable to hold error messages that come from the server if login operation fails
   */
  serverErrorMessages: String

  /**
   * a dictionary to hold the user information as key value pairs
   */
  userData = {
    email: '',
    password: '',
  }

  /**
   * Angular form for login with two controls (email, password)
   */
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // validate email
    password: new FormControl('', Validators.required),
  })

  /**
   * a Constructor to create new instance of this class
   *
   * @param auth : Injecting AuthService for authenticating the user
   * @param router : used to navigate to another route
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * This function is called after the constructor is executed.
   */
  ngOnInit() {}

  /**
   * This function is used pass the user data to loginUser function in AuthService
   */
  loginUser() {
    this.auth.loginUser(this.userData).subscribe(
      (res) => {
        localStorage.setItem('token', res.token) //set token in the local storage
        this.router.navigate(['/news']) //if sucess, redirecting user to news page
      },
      (err) => {
        if (err.status === 401) {
          this.serverErrorMessages = err.error
          setTimeout(() => (this.serverErrorMessages = ''), 3000) // display error message if login fails
        }
      }
    )
  }
}