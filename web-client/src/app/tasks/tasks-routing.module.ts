import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TaskComponent} from './task/task.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {AuthGuard} from '../guards/auth.guard';


const routes: Routes = [
  {path: '', component: TasksListComponent},
  {path: 'task/:id', component: TaskComponent},
  {path: 'add', component: AddTaskComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
