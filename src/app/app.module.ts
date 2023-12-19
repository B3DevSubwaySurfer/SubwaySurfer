import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from './screens/home/home.component';
import { StationComponent } from "./components/station/station.component";
import {StationPreviewComponent } from "./screens/station-preview/station-preview.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, HomeComponent, StationComponent, StationPreviewComponent],
  imports: [BrowserModule, RouterOutlet, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
