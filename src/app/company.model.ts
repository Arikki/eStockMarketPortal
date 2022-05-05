import { Stock } from "./stock.model";

export class Company{
   	_id:string;

	company_name:string;

	ceo_name:string;

	turn_over:number;

	website:string;

	enlisted_stock_markets:string;
	
	stock:Stock;
}