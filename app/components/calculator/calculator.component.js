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
var calculator_service_1 = require('../../services/calculator/calculator.service');
var CalculatorComponent = (function () {
    function CalculatorComponent(calculatorService) {
        this.calculatorService = calculatorService;
        this.calcWindow = '';
    }
    // grabs the previously entered calculations from the In Memory Web API db
    CalculatorComponent.prototype.getCalculationLog = function () {
        var _this = this;
        this.calculatorService.getCalculations().then(function (calculations) { return _this.equations = calculations; });
    };
    // adds a new calculation to the In Memory Web API db
    CalculatorComponent.prototype.addCalculationLog = function (equation) {
        var _this = this;
        this.completeString = equation + '=' + eval(equation);
        this.calculatorService.create(this.completeString).then(function (result) {
            _this.equations.push(result);
        });
    };
    // updates the front-end calculator window
    CalculatorComponent.prototype.addToCalc = function (input) {
        this.calcWindow += input;
        this.warning = false;
    };
    // calculates the user-given input, throws error if calculation is invalid
    CalculatorComponent.prototype.calculate = function () {
        try {
            eval(this.calcWindow);
            this.addCalculationLog(this.calcWindow);
            this.clear();
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                this.warning = true;
                this.errorMessage = e.message;
            }
        }
    };
    // clears the front-end calculator window
    CalculatorComponent.prototype.clear = function () {
        this.calcWindow = '';
        this.warning = false;
    };
    // loads the previous calculations on start-up
    CalculatorComponent.prototype.ngOnInit = function () {
        this.getCalculationLog();
    };
    CalculatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-calc',
            templateUrl: 'calculator.component.html'
        }), 
        __metadata('design:paramtypes', [calculator_service_1.CalculatorService])
    ], CalculatorComponent);
    return CalculatorComponent;
}());
exports.CalculatorComponent = CalculatorComponent;
//# sourceMappingURL=calculator.component.js.map