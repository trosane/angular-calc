import { Component, OnInit, Input } from '@angular/core';

import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  moduleId: module.id,
  selector: 'my-calc',
  templateUrl: 'calculator.component.html'
})

export class CalculatorComponent implements OnInit { 
    calcWindow = '';

    constructor(
        private calculatorService: CalculatorService
    ) {}

    equations: string[]; // stores the equations previouly calculated by the user for front end display
    completeString: string; // stores the complete (x+y=z) string
    warning: boolean; // error message flag
    errorMessage: string;// error message if calculation is invalid

    // grabs the previously entered calculations from the In Memory Web API db
    getCalculationLog(): void {
        this.calculatorService.getCalculations().then(calculations => this.equations = calculations);
    }

    // adds a new calculation to the In Memory Web API db
    addCalculationLog(equation: string): void {
        this.completeString = equation + '=' + eval(equation);
        this.calculatorService.create(this.completeString).then(result => {
                this.equations.push(result);
            });
    }

    // updates the front-end calculator window
    addToCalc(input: string): void {
        this.calcWindow += input;
        this.warning = false;
    }

    // calculates the user-given input, throws error if calculation is invalid
    calculate(): void {
        try {
            eval(this.calcWindow);
            this.addCalculationLog(this.calcWindow);
            this.clear();
        } catch (e) {
            if (e instanceof SyntaxError) {
                this.warning = true;
                this.errorMessage = e.message;
            }
        }
    }

    // clears the front-end calculator window
    clear(): void {
        this.calcWindow = '';
        this.warning = false;
    }
    
    // loads the previous calculations on start-up
    ngOnInit(): void {
        this.getCalculationLog();
    }
}