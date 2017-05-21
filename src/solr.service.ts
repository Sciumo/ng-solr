import { Injectable } from '@angular/core';

import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Solr} from './solr';

@Injectable()
export class SolrService {

  cmd:Solr.SolrCmd;

  constructor( public url:string = "http://localhost:8983/solr/", public http:Http ) { 
    this.cmd = new Solr.SolrCmd(this.url, http);
  }

  post( core: string, data: any ) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, data, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  status():Observable<Solr.Status[]> {
    return this.cmd.status()
               .map(this.extractStatus)
               .catch(this.handleError);
  }

  search (core: string, q: string):Observable<any[]> {
    console.log(`search ${core} ${q}`);
    return this.cmd.queryS(core,q)
               .map(this.extractData)
               .catch(this.handleError);
  }

  private extractStatus(res: Response) {
    console.log(`extraceStatus:${res}`);
    let body:Solr.Status = res.json() as Solr.Status;
    return body || {};
  }

  private extractData(res: Response) {
    console.log(`extractData:${res}`);
    let body = res.text();
    console.log(body);
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
