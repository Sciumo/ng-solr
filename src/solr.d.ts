import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare module Solr {
    interface Index {
        numDocs: number;
        maxDocs: number;
    }
    interface Status {
        name: string;
        instanceDir: string;
        dataDir: string;
        schema: string;
        startTime: string;
        updatime: number;
        index: Index;
    }
    class SolrCmd {
        url: string;
        http: Http;
        options: RequestOptions;
        constructor(url: string, http: Http);
        status(): Observable<Response>;
        coreurl(core: string, cmd: string): string;
        queryS(core: string, q: string): Observable<Response>;
        query(core: string, params: URLSearchParams): Observable<Response>;
    }
}
