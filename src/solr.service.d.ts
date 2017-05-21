import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Solr } from './solr';
export declare class SolrService {
    url: string;
    http: Http;
    cmd: Solr.SolrCmd;
    constructor(url: string, http: Http);
    post(core: string, data: any): Observable<any>;
    status(): Observable<Solr.Status[]>;
    search(core: string, q: string): Observable<any[]>;
    private extractStatus(res);
    private extractData(res);
    private handleError(error);
}
