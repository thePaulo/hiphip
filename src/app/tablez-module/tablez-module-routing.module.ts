import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFormComponent } from '../my-form/my-form.component';
import { MyTableComponent } from '../my-table/my-table.component';

const routes: Routes = [
  {
    path:"", component:MyTableComponent
  },{
    path:"new", component:MyFormComponent
  },{
    path:":id/edit", component:MyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablezModuleRoutingModule { }
