import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsService } from '../../Services/ContactUs.service';
import { IndexComponent } from './Index/Index.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import { ContactUsRoutes } from './ContactUs.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContactUsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent],
  providers: [ContactUsService]
})
export class ContactUsModule { }
