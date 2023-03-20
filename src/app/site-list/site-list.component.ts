import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteUrl!: string;
  siteImageUrl!: string;
  siteId!: string;
  formState: string = 'Add New';
  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  showAlert(successMessage: string) {
    this.isSuccess = true;
    this.successMessage = successMessage;
  }

  onSubmit(value: object) {
    console.log(value);
    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addSite(value)
        .then(() => {
          this.showAlert('Data saved successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, value)
        .then(() => {
          this.showAlert('Data updated successfully');
        })
        .catch((err) => {
          console.log('An error occurred', err);
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadData();
  }

  editSite(
    siteName: string,
    siteUrl: string,
    siteImageUrl: string,
    id: string
  ) {
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImageUrl = siteImageUrl;
    this.siteId = id;
    this.formState = 'Edit';
  }

  deleteSite(siteId: string) {
    this.passwordManagerService
      .deleteSite(siteId)
      .then(() => {
        this.showAlert('Data deleted successfully');
      })
      .catch((err) => {
        console.log('An error occurred', err);
      });
  }
}
