import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
  loadChildren: './dashboard/dashboard.module#dashboardModule' 
},
  { path: 'login',
  loadChildren: './login/login.module#LoginModule' 
},
// otherwise redirect to home
//{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
