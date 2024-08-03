import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
  },
  {
    path: 'addnewemp',
    loadComponent: () =>
      import('./components/employee-form/employee-form.component').then(
        (load) => load.EmployeeFormComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
