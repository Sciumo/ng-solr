import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SolrService } from './solr.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers:[SolrService]
})
export class SolrModule { 
}
