import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskAdd } from './components/task-add/task-add';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'add', component: TaskAdd },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
