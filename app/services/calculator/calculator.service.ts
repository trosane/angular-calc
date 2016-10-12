import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CalculatorService {

    private calcUrl = 'app/calculations';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    // grabs the previous calculations and returns them to the front-end
    getCalculations(): Promise<string[]> {
        return this.http.get(this.calcUrl).toPromise()
            .then(res => res.json().data as string[])
            .catch(this.handleError);
    }

    // creates a new calculation and returns it to the front-end
    create(equation: string): Promise<any> {
        return this.http.post(this.calcUrl, JSON.stringify({equation: equation}), {headers: this.headers})
        .toPromise().then(res => res.json().data)
        .catch(this.handleError);
    }

    // handles any errors that may occur when making requests to the API
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }


}