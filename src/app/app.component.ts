import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from './app.service';
import { Company } from './company.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  constructor(private appService:AppService) {}

  companies:Array<Company>;
  selectedCmpnyCode:string;
  selectedCmpnyName:string;
  stocks:Array<any>;
  isSubmitted = false;
  isCalculated = false;
  minPrice = 0;
  maxPrice = 0;
  avgPrice = 0;
  ngOnInit(): void {
    console.log("Inside init")
   this.appService.getAll().subscribe(
     {next: (respData) => {
       this.companies = respData;
       console.log(this.companies);
     },
        complete: () => console.log()}
     
    );
  }

  getCompanyName(){
    this.selectedCmpnyName = this.appService.getCompanyName(this.selectedCmpnyCode,this.companies);
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.appService.getStockDetails(form).subscribe(
      {next: (respData) => {
       
        console.log(respData);
        this.stocks = respData;
       this.minPrice = Math.min.apply(null,this.stocks.map(stock => stock.stock_price));
       this.maxPrice = Math.max.apply(null,this.stocks.map(stock => stock.stock_price));
       console.log((this.stocks.map(stock => stock.stock_price).reduce((a,b) => a + b, 0))/this.stocks.length);
       this.avgPrice = ((this.stocks.map(stock => stock.stock_price).reduce((a,b) => a + b, 0))/this.stocks.length);
        this.isSubmitted = true;
      },
         complete: () => console.log()}
      
     );
  }
 
}
