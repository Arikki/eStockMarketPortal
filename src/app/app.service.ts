import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { NgForm } from "@angular/forms";
import { Stock } from "./stock.model";



@Injectable({ providedIn: 'root' })
export class AppService{

    constructor(private http: HttpClient) {}

    getAll(){
        console.log("inside svc");
        const url = "http://localhost:8081/api/v1.0/market/company/getall";
        return  this.http.get<Company[]>(url).pipe(
            catchError((errorResp) => {
              let errorMsg = "An error occured!";
              if(!errorResp.error){
                  
                  return throwError (() => errorMsg);
               }
  
              errorMsg = errorResp.error.message;
               
              return throwError (() => errorMsg);
            })
          );

    }

    getCompanyName(companyCode:string,companies:Array<any>){
        let company = companies.find(company => company._id == companyCode)
        return company.company_name;
    }

    getStockDetails(form:NgForm){   

        const url = "http://localhost:8082/api/v1.0/market/stock/get/" + form.value.companyCode+"/"+form.value.startDate+"/"+form.value.endDate;
        return this.http.get<Stock[]>(url).pipe(
            catchError((errorResp) => {
              let errorMsg = "An error occured!";
              if(!errorResp.error){
                  
                  return throwError (() => errorMsg);
               }
  
              errorMsg = errorResp.error.message;
               
              return throwError (() => errorMsg);
            })
          );


    }
}