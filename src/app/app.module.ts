import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaComponent } from './tabla/tabla.component';
import { CustomRenderComponent } from './custom-render/custom-render.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    CustomRenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
  ],
  entryComponents: [CustomRenderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
