import {Component, OnInit, Input} from '@angular/core';
import {TransactionService} from '../transaction.service'
import {Merchant} from "../../../class/merchant";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { Logger } from "angular2-logger/core";

@Component({

  selector:'all',
  templateUrl:'./all.component.html',
  providers:[TransactionService]

})

export class AllComponent implements OnInit{

  data;
  filterdata;

  todate;
  fromdate;

  day = false;
  daytoday =false;

  //error handling
  transctionError = false;
  transctionInfo = false;
  infomassage =""
  errormassage=""
  type="";


  //selectedDate = "2017-09-11";
  private selectedDateFrom: Object = { date: { year: 2016, month: 10, day: 9 } };
  private selectedDateTo: Object = { date: { year: 2017, month: 10, day: 9 } };


  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  merchantqrcode = false;
  merchantId="";

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    markCurrentDay:true,
    todayBtnTxt:'Today',

  };



  constructor(private trasaction: TransactionService,private _logger: Logger) {
  }
  ngOnInit() {

    this.initiateDate();
    // this.data = this.userService.getData();
    /*this.users = this.userService.getUsersId();
     this.userService.getData().then((data) => {
     if(data.data != null){
     this.data = data.data;
     this.filterdata = this.data;
     //console.log(this.data);

     }
     else {
     console.log(data.data);
     }
     });*/
  }
  initiateDate(){
    let date  = new Date();
    var currentdate ={
      date:{
        year : date.getFullYear(),
        month :date.getMonth()+1,
        day : date.getDate()

      }

    }
    this.selectedDateFrom = currentdate;
    this.selectedDateTo = currentdate;
    this.fromdate = currentdate.date;
    this.todate = currentdate.date;

  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }
  showQrcode(id:any){


    this.merchantId=id;
    this.merchantqrcode = true;
  }
  onDateChangedTo(event: IMyDateModel) {

    this.todate =  event.date;
    this.selectedDateTo = event;

  }
  onDateChangedFrom(event: IMyDateModel) {

    this.fromdate = event.date;
    this.selectedDateFrom = event;
    console.log(event.date);

  }
  filterDate(){


    if(+this.type == 0){

      console.log("Day")
      this.day = true;
      this.daytoday =false;

    }
    if(+this.type == 1){
      console.log("DayToDay")
      this.day = true;
      this.daytoday =true;
    }

  }
  getTransaction(){

    this.transctionInfo=false;
    this.transctionError =false;
    this.filterdata = [];

    if(+this.type == 0){
      this.nextDate();
      this.getByDateToDate()

    }
    if(+this.type == 1){
      this.getByDateToDate()
    }

  }
  getByDateToDate(){
    console.log("getByDAteToDate");
    this.trasaction.getTransactionByDateToDate(this.fromdate,this.todate).then((data) => {

      if(data.data.length==0){
        this.infomassage = "Transaction not avilable";
        this.transctionInfo = true;
      }
      else if(data.data != null){
        this.data = data.data;
        this.filterdata = this.data;


      }
      else {
        if(data.errors != null){
          this.errormassage = data.errors[0].source.title;
          this.transctionError = true;
        }

      }
    });

  }

  nextDate(){
    console.log(this.fromdate);
    var date = new Date(this.fromdate.year,+this.fromdate.month-1,this.fromdate.day);
    date.setDate(date.getDate()+1);
    this.todate.year = date.getFullYear();
    this.todate.month = date.getMonth()+1;
    this.todate.day = date.getDate();

  }
  selectType(){
    this._logger.error('This is a priority level 1 error message...'+this.type);
    this._logger.debug('tyoe ',""+this.type)
  }


}
