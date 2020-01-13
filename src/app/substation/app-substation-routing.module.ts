import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubstationHomeComponent} from './_pages/substation-home/substation-home.component';
import {SubstationVisualizationComponent} from './_pages/substation-visualization/substation-visualization.component';

const SUBSTATION_ROUTES: Routes =
[
  {
    path: '',
    redirectTo: 'substation-home',
    pathMatch: 'prefix'
  },
  {
    path: 'substation-home',
    component: SubstationVisualizationComponent
  },
  {
    path: '**',
    redirectTo: 'substation-home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(SUBSTATION_ROUTES, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppSubstationRoutingModule { }
