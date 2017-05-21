
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export module Solr {
    export interface Index {
        numDocs:number;
        maxDocs:number;
    }

    export interface Status {
        name:string;
        instanceDir:string;
        dataDir:string;
        schema:string;
        startTime:string;
        updatime:number;
        index:Index;
    }

    export class SolrCmd {
        options:RequestOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        constructor( public url:string, public http:Http ) {            
        }

        status():Observable<Response> {
            let url = this.url + "admin/cores";
            let params = new URLSearchParams();
            params.set("wt", "json");
            params.set("indent","on");
            params.set("action","STATUS");
            let p = { params:params };
            console.log(`status: url:"${url}" p:"${JSON.stringify(p)}"`);
            return this.http.get( url, p );
        } 

        coreurl( core:string, cmd:string) {
            return this.url + core + "/" + cmd;
        }

        queryS( core:string, q:string ):Observable<Response> {
            return this.query( core, new URLSearchParams( "q=" + q));
        }

        query( core:string, params:URLSearchParams ):Observable<Response> {
            let url = this.coreurl(core,"select");
            params.set("wt", "json");
            params.set("indent","on");
            let p = { params:params };
            console.log(`query: url:"${url}" p:"${JSON.stringify(p)}"`);
            return this.http.get( url, p );
        }        
        
    }
}