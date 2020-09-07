import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';


export interface LinkSocial {
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo;
  selectedFile: File = null;
  formChangePassword: FormGroup;
  formProfileUser: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public errorMessageService: ErrorMessageService,
    private location: Location,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.spinner.show('AppSpinner');
    this.formProfileUser = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      about: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: [null, Validators.required],
    });
    this.userService.getProfile().then(data => {
      console.log("ProfileComponent -> ngOnInit -> data", data)
      this.userInfo = data;
      this.userInfo?.linkSocial.forEach(link => {
        this.linkSocials.push({ name: link.trim() });
      });
      this.formProfileUser = this.formBuilder.group({
        id: [this.userInfo._id, Validators.required],
        username: [this.userInfo.username, Validators.required],
        email: [this.userInfo.email, Validators.required],
        address: [this.userInfo.address, Validators.required],
        about: [this.userInfo.about, Validators.required],
        gender: [this.userInfo.gender, Validators.required],
        birthday: [this.userInfo.birthday ? (new Date(this.userInfo.birthday)) : null, Validators.required],
      });
      this.spinner.hide('AppSpinner');
    }).catch(err => {
      this.errorMessageService.getMessageFromKey(err.error);
    });
    this.formChangePassword = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }
  openFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  updateProfile() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.userService.uploadProfileImage(formData).then(data => {
      this.userInfo = data;
    }).catch(err => {
      this.errorMessageService.getMessageFromKey(err.error);
    })

  }

  onClickCancel() {
    this.location.back();

  }

  onClickUpdateProfileSetting() {
    this.spinner.show('AppSpinner');
    var formValue = this.formProfileUser.value;
    let linkSocial: string[] = [];
    this.linkSocials.forEach(link => {
      linkSocial.push(link.name);
    });
    var body = {
      'gender': formValue.gender,
      'address': formValue.address,
      'about': formValue.about,
      'linkSocial': linkSocial,
      'username': formValue.username,
      'birthday': formValue.birthday
    }
    this.userService.updateProfile(body).then(data => {
      this.spinner.hide('AppSpinner');
      this.notification.create(
        'success',
        'Successful',
        'Update profile successful',
        { nzDuration: 2000 }
      );
    }).catch(err => {
      this.errorMessageService.getMessageFromKey(err.error);
    });
  }


  /////

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  linkSocials: LinkSocial[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.linkSocials.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: LinkSocial): void {
    const index = this.linkSocials.indexOf(fruit);
    if (index >= 0) {
      this.linkSocials.splice(index, 1);
    }
  }

}
