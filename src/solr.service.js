"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var solr_1 = require("./solr");
var SolrService = (function () {
    function SolrService(url, http) {
        if (url === void 0) { url = "http://localhost:8983/solr/"; }
        this.url = url;
        this.http = http;
        this.cmd = new solr_1.Solr.SolrCmd(this.url, http);
    }
    SolrService.prototype.post = function (core, data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SolrService.prototype.status = function () {
        return this.cmd.status()
            .map(this.extractStatus)
            .catch(this.handleError);
    };
    SolrService.prototype.search = function (core, q) {
        console.log("search " + core + " " + q);
        return this.cmd.queryS(core, q)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SolrService.prototype.extractStatus = function (res) {
        console.log("extraceStatus:" + res);
        var body = res.json();
        return body || {};
    };
    SolrService.prototype.extractData = function (res) {
        console.log("extractData:" + res);
        var body = res.text();
        console.log(body);
        return body || {};
    };
    SolrService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return SolrService;
}());
SolrService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, http_1.Http])
], SolrService);
exports.SolrService = SolrService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29sci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLHNDQUF5RjtBQUN6Riw4Q0FBNkM7QUFFN0MsbUNBQWlDO0FBQ2pDLGlDQUErQjtBQUUvQiwrQkFBNEI7QUFHNUIsSUFBYSxXQUFXO0lBSXRCLHFCQUFvQixHQUEwQyxFQUFTLElBQVM7UUFBNUQsb0JBQUEsRUFBQSxtQ0FBMEM7UUFBMUMsUUFBRyxHQUFILEdBQUcsQ0FBdUM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzlFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxXQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBTSxJQUFZLEVBQUUsSUFBUztRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2FBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFRLElBQVksRUFBRSxDQUFTO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxJQUFJLFNBQUksQ0FBRyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7YUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsR0FBYTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixHQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksR0FBZSxHQUFHLENBQUMsSUFBSSxFQUFpQixDQUFDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxpQ0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWUsR0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFHLENBQUM7SUFDckIsQ0FBQztJQUVPLGlDQUFXLEdBQW5CLFVBQXFCLEtBQXFCO1FBQ3hDLHFFQUFxRTtRQUNyRSxJQUFJLE1BQWMsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksZUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ2hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sWUFBTSxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsVUFBSSxHQUFLLENBQUM7UUFDaEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUQsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF2REQsSUF1REM7QUF2RFksV0FBVztJQUR2QixpQkFBVSxFQUFFOzZDQUtpRSxXQUFJO0dBSnJFLFdBQVcsQ0F1RHZCO0FBdkRZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgVVJMU2VhcmNoUGFyYW1zLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5pbXBvcnQge1NvbHJ9IGZyb20gJy4vc29scic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2xyU2VydmljZSB7XG5cbiAgY21kOlNvbHIuU29sckNtZDtcblxuICBjb25zdHJ1Y3RvciggcHVibGljIHVybDpzdHJpbmcgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODk4My9zb2xyL1wiLCBwdWJsaWMgaHR0cDpIdHRwICkgeyBcbiAgICB0aGlzLmNtZCA9IG5ldyBTb2xyLlNvbHJDbWQodGhpcy51cmwsIGh0dHApO1xuICB9XG5cbiAgcG9zdCggY29yZTogc3RyaW5nLCBkYXRhOiBhbnkgKXtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLCBkYXRhLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIHN0YXR1cygpIDogT2JzZXJ2YWJsZTxTb2xyLlN0YXR1c1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuY21kLnN0YXR1cygpXG4gICAgICAgICAgICAgICAubWFwKHRoaXMuZXh0cmFjdFN0YXR1cylcbiAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIHNlYXJjaCAoY29yZTogc3RyaW5nLCBxOiBzdHJpbmcpIDogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGNvbnNvbGUubG9nKGBzZWFyY2ggJHtjb3JlfSAke3F9YCk7XG4gICAgcmV0dXJuIHRoaXMuY21kLnF1ZXJ5Uyhjb3JlLHEpXG4gICAgICAgICAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXG4gICAgICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RTdGF0dXMocmVzOiBSZXNwb25zZSl7XG4gICAgY29uc29sZS5sb2coYGV4dHJhY2VTdGF0dXM6JHtyZXN9YCk7XG4gICAgbGV0IGJvZHk6U29sci5TdGF0dXMgPSByZXMuanNvbigpIGFzIFNvbHIuU3RhdHVzO1xuICAgIHJldHVybiBib2R5IHx8IHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coYGV4dHJhY3REYXRhOiR7cmVzfWApO1xuICAgIGxldCBib2R5ID0gcmVzLnRleHQoKTtcbiAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICByZXR1cm4gYm9keSB8fCB7IH07XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB5b3UgbWlnaHQgdXNlIGEgcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgfVxufVxuIl19