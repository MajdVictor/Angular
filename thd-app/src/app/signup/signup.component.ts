import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

/**
 * signup class which holds the code for Signup component
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /**
   * boolean variable that will be set to true of registeration is successful
   */
  showSuccessMessage: boolean

  /**
   * string variable that will hold error messages from the server
   */
  serverErrorMessages: String


  /**
   * variable of type dictionary which will hold the user data entered by the user in signup form
   *
   */
  
  userData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  }

  /**
   * Angular form for registration with five controls (firstName, lastName, username, email, password)
   * it also validates user inputs and all fields are required
   */
  signUpForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    }
  )

  /**
   * a Constructor to create new instance of this class
   * @param auth : Injected authService for authenticating the user
   * @param router: used to redirect the user to different route
   */
  constructor(private auth: AuthService, private router: Router) { }

  /**
   * This function is called after the constructor is executed.
   */
  ngOnInit(){
  
  }

  /**
   * This method calls registerNewUser method inside the auth service and pass the userData that
   * was retrieved from the form
   */
  addUser(){
    this.auth.registerNewUser(this.userData).subscribe(
      
      (res) => {
        this.showSuccessMessage = true  //setting success messgae variable to true
        setTimeout(()=>this.showSuccessMessage = false, 3000) //showing success message for 3 seconds
        localStorage.setItem('token', res.token) //setting token in local storage
        this.router.navigate(['/home'])  //redirecting user to home page
      },
      (err) => {
        if (err.status === 400){
          this.serverErrorMessages = err.error  //assigning error message from the server to serverErrorMessages
          setTimeout(()=>this.serverErrorMessages ="" , 3000)  //displaying the error message for 3 seconds

        }} 
      

    )
}

  


}
