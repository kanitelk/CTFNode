import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomepageComponent}
    ]),
    SharedModule
  ],
  exports: [RouterModule]
})
export class HomepageModule {
}
