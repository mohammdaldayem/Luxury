import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './Index/Index.component';
import { NgxEditorModule } from 'ngx-editor';
import { RouterModule } from '@angular/router';
import { TermsAndConditionsRoutes } from './TermsAndConditions.routing';
import { TermsService } from '../../Services/Terms.service';
import { MaterialModule } from '../../app.module';
import { MatGridListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TermsAndConditionsRoutes),
    NgxEditorModule,
    MaterialModule,
    MatGridListModule,
    FormsModule
  ],
  declarations: [IndexComponent],
  providers: [TermsService]
})
export class TermsAndConditionsModule { }
