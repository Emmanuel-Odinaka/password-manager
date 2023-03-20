import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent {

  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImageUrl!: string;

  passwordList!: any;
  email: any;
  password: any;
  username: any;
  passwordId: any;
  isSuccess: any;
  successMessage: any;

  formState: string = 'Add New'


  constructor(private route: ActivatedRoute,
      private passwordManagerService: PasswordManagerService,
    ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImageUrl = val.siteImageUrl;
    })
    this.loadPasswords();

  }

  showAlert(successMessage: string) {
    this.isSuccess = true;
    this.successMessage = successMessage;
  }



  onSubmit(value: any) {
    const encryptedPassword = this.encryptPassword(value.password);
    value.password = encryptedPassword;
    if (this.formState === 'Add New') {
      this.passwordManagerService.addPassword(value, this.siteId)
        .then(() => {
          this.showAlert('Data saved successfully')
          this.resetForm()
        })
        .catch(err=> {
          console.log('Data deleted successfully');
        })
    } else if (this.formState === 'Edit') {
      this.passwordManagerService.updatePassword(value, this.siteId, this.passwordId)
        .then(() => {
          this.showAlert('Data updated successfully')
          this.resetForm()
        })
        .catch(err=> {
          console.log(err, 'Error occurred');
        })
    }
  }

  loadPasswords() {
    this.passwordManagerService.loadPasswords(this.siteId)
      .subscribe(val => {
        this.passwordList = val;
      });
  }

  editPassword(value: any) {
    this.email = value.email
    this.username = value.username
    this.password = value.password
    this.passwordId = value.id
    this.formState = 'Edit'
  }

  deletePassword(deletePassword: any) {
    this.passwordManagerService.deletePassword(this.siteId, deletePassword.id)
    .then(() => {
      this.showAlert('Data deleted')
    })
    .catch(err => {
      console.log('Error occurred')
    })
  }

  resetForm() {
    this.email = ''
    this.username = ''
    this.password = ''
    this.passwordId = ''
    this.formState = 'Add New'
  }

  encryptPassword(password: string) {
    const secretKey = 'w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-K';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = 'w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-K'
    const decryptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decryptedPassword;
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    console.log(decPassword)
    this.passwordList[index].password = decPassword;
  }

}
