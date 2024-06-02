import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authenticationGuard } from './auth/authentication.guard';
import { LikedPropertyComponent } from './components/dashboard/liked-property/liked-property.component';
import { PropertyComponent } from './components/dashboard/property/property.component';
import { UploadPropertyComponent } from './components/dashboard/upload-property/upload-property.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'house',
    component: HouseComponent,
  },
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
    canActivate: [authenticationGuard],
    children:[
      {path:'liked',
       component:LikedPropertyComponent 
      },
      {
        path:'property',
        component:PropertyComponent,
      },
      {
        path:'upload',
        component:UploadPropertyComponent
      }
    ]
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/login/login.module').then((mod) => mod.LoginModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
