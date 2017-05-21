System.registerDynamic("src/solr-select.component", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var SolrSelectComponent = function () {
        function SolrSelectComponent() {}
        return SolrSelectComponent;
    }();
    SolrSelectComponent = __decorate([core_1.Component({
        selector: 'solr-select',
        templateUrl: './solr-select.component.html',
        styleUrls: ['./solr-select.component.scss']
    })], SolrSelectComponent);
    exports.SolrSelectComponent = SolrSelectComponent;
    return module.exports;
});
System.registerDynamic("src/solr", ["@angular/http"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var http_1 = $__require("@angular/http");
    var Solr;
    (function (Solr) {
        var SolrCmd = function () {
            function SolrCmd(url, http) {
                this.url = url;
                this.http = http;
                this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
            }
            SolrCmd.prototype.status = function () {
                var url = this.url + "admin/cores";
                var params = new http_1.URLSearchParams();
                params.set("wt", "json");
                params.set("indent", "on");
                params.set("action", "STATUS");
                var p = { params: params };
                console.log("status: url:\"" + url + "\" p:\"" + JSON.stringify(p) + "\"");
                return this.http.get(url, p);
            };
            SolrCmd.prototype.coreurl = function (core, cmd) {
                return this.url + core + "/" + cmd;
            };
            SolrCmd.prototype.queryS = function (core, q) {
                return this.query(core, new http_1.URLSearchParams("q=" + q));
            };
            SolrCmd.prototype.query = function (core, params) {
                var url = this.coreurl(core, "select");
                params.set("wt", "json");
                params.set("indent", "on");
                var p = { params: params };
                console.log("query: url:\"" + url + "\" p:\"" + JSON.stringify(p) + "\"");
                return this.http.get(url, p);
            };
            return SolrCmd;
        }();
        Solr.SolrCmd = SolrCmd;
    })(Solr = exports.Solr || (exports.Solr = {}));
    return module.exports;
});
System.registerDynamic("src/solr.service", ["@angular/core", "@angular/http", "rxjs/Observable", "rxjs/add/operator/catch", "rxjs/add/operator/map", "./solr"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var http_1 = $__require("@angular/http");
    var Observable_1 = $__require("rxjs/Observable");
    $__require("rxjs/add/operator/catch");
    $__require("rxjs/add/operator/map");
    var solr_1 = $__require("./solr");
    var SolrService = function () {
        function SolrService(url, http) {
            if (url === void 0) {
                url = "http://localhost:8983/solr/";
            }
            this.url = url;
            this.http = http;
            this.cmd = new solr_1.Solr.SolrCmd(this.url, http);
        }
        SolrService.prototype.post = function (core, data) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.url, data, options).map(this.extractData).catch(this.handleError);
        };
        SolrService.prototype.status = function () {
            return this.cmd.status().map(this.extractStatus).catch(this.handleError);
        };
        SolrService.prototype.search = function (core, q) {
            console.log("search " + core + " " + q);
            return this.cmd.queryS(core, q).map(this.extractData).catch(this.handleError);
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
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
            console.error(errMsg);
            return Observable_1.Observable.throw(errMsg);
        };
        return SolrService;
    }();
    SolrService = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [String, http_1.Http])], SolrService);
    exports.SolrService = SolrService;
    return module.exports;
});
System.registerDynamic("src/solr.module", ["@angular/core", "@angular/common", "@angular/http", "./solr.service"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    var http_1 = $__require("@angular/http");
    var solr_service_1 = $__require("./solr.service");
    var SolrModule = function () {
        function SolrModule() {}
        return SolrModule;
    }();
    SolrModule = __decorate([core_1.NgModule({
        imports: [common_1.CommonModule, http_1.HttpModule],
        providers: [solr_service_1.SolrService]
    })], SolrModule);
    exports.SolrModule = SolrModule;
    return module.exports;
});
System.registerDynamic("ng-solr", ["./src/solr-select.component", "./src/solr.module"], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  var solr_select_component_1 = $__require("./src/solr-select.component");
  exports.SolrSelectComponent = solr_select_component_1.SolrSelectComponent;
  var solr_module_1 = $__require("./src/solr.module");
  exports.SolrModule = solr_module_1.SolrModule;
  return module.exports;
});