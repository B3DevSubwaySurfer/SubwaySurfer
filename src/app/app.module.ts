import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HomeComponent } from './screens/home/home.component';
import { TvmComponent } from './components/tvm/tvm.component';
import { StationComponent } from "./components/station/station.component";
import {StationPreviewComponent } from "./screens/station-preview/station-preview.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, TvmComponent, StationComponent, StationPreviewComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
