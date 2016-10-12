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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var CalculatorService = (function () {
    function CalculatorService(http) {
        this.http = http;
        this.calcUrl = 'app/calculations';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // grabs the previous calculations and returns them to the front-end
    CalculatorService.prototype.getCalculations = function () {
        return this.http.get(this.calcUrl).toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // creates a new calculation and returns it to the front-end
    CalculatorService.prototype.create = function (equation) {
        return this.http.post(this.calcUrl, JSON.stringify({ equation: equation }), { headers: this.headers })
            .toPromise().then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // handles any errors that may occur when making requests to the API
    CalculatorService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    CalculatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CalculatorService);
    return CalculatorService;
}());
exports.CalculatorService = CalculatorService;
//# sourceMappingURL=calculator.service.js.map