import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppSubstationRoutingModule } from './app-substation-routing.module';
import { SubstationVisualizationComponent} from './_pages/substation-visualization/substation-visualization.component';
import {ServerSentEventService} from './_services/server-sent-event.service';

@NgModule({
  declarations:
  [
      SubstationVisualizationComponent
  ],
  imports:
  [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      CommonModule,
      RouterModule,
      AppSubstationRoutingModule
  ],
  providers:
  [
      ServerSentEventService
  ],
  exports:
  [
      SubstationVisualizationComponent
  ],
  bootstrap:
  [
      SubstationVisualizationComponent
  ]
})
export class SubstationModule { }
