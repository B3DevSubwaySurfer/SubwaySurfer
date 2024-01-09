import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./screens/home/home.component";
import { StationPreviewComponent } from "./screens/station-preview/station-preview.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'preview',
        component: StationPreviewComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
    // Autres routes...
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }