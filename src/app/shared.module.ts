import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CommentComponent } from './components/comment/comment.component';



@NgModule({
  declarations: [
    CommentComponent,
    SpinnerComponent
  ],
  exports: [
    CommentComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
