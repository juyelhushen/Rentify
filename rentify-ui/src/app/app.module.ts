import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { HouseCardComponent } from './components/house/house-card/house-card.component';
import { MaterialModule } from './shared/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';
import { SellerDetailsComponent } from './components/house/seller-details/seller-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LikedPropertyComponent } from './components/dashboard/liked-property/liked-property.component';
import { UploadPropertyComponent } from './components/dashboard/upload-property/upload-property.component';
import { PropertyComponent } from './components/dashboard/property/property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    HouseComponent,
    HouseCardComponent,
    SellerDetailsComponent,
    DashboardComponent,
    LikedPropertyComponent,
    UploadPropertyComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: UserService.getToken,
        allowedDomains: ["localhost:8081"],
        disallowedRoutes: ["http://localhost:4200/house"],
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
