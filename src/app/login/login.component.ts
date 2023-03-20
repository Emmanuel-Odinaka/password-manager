import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isError: boolean = false;
  constructor(private passwordManagerService: PasswordManagerService, private router: Router,) {

  }

  onSubmit(value: any) {
    console.log(value, 'va')
    this.passwordManagerService.login(value.email, value.password)
      .then(() => {
        this.router.navigate(['/site-list'])
        console.log('Login Success')
      })
      .catch(err => {
        this.isError = true;
        console.log(err, 'Error occurred');
      })
  }
}
