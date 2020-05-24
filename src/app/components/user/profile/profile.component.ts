import { UserInfo } from './../../../types/user-info';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo;
  selectedFile: File = null;
  formChangePassword: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.userService.getProfile().then(data => {
      console.log("ProfileComponent -> ngOnInit -> data", data)
      this.userInfo = data;
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

}
