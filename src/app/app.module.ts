import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { HomeComponent } from './screens/home/home.component';
import { StationComponent } from "./components/station/station.component";
import {StationPreviewComponent } from "./screens/station-preview/station-preview.component";
import {AppRoutingModule} from "./app-routing.module";
import {AppService} from "../services/app.service";
import { InkLevelGameComponent } from './screens/ink-level-game/ink-level-game.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, StationComponent, StationPreviewComponent, InkLevelGameComponent],
  imports: [BrowserModule, RouterOutlet, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
