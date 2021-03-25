import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import { CovidTab } from '../covid-tab';
import { CovidUserApiService } from '../covid-user-api.service';
import { LocalStorageService } from '../local-storage.service';
import { ViewServiceService } from '../view-service.service';
HC_exporting(Highcharts);

@Component({
  selector: 'app-area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.css']
})
export class AreaViewComponent implements OnInit {

  public Highcharts: typeof Highcharts = Highcharts; // required
public state:string;

  public chartOptions: any = {
    chart: {
      type: "area",
    },
    title: {
      text: "Active Covid Cases Statistics",
    },
    subtitle: {
      text: "India",
    },
    xAxis: {
      categories: [],
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: "Active Covid Cases(Count)",
      },
      labels: {
        formatter: function () {
          return this.value / 10;
        },
      },
    },
    tooltip: {
      split: true,
      valueSuffix: " Active Covid Cases",
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    series: [
      
    ],
  }; // required
  updateFlag = false;
  constructor(private viewService: ViewServiceService,private covidApi : CovidUserApiService,private  localStorage:LocalStorageService) 
  {
    this.localStorage.getEvent().subscribe(res=>{
      let type=res["type"];
      
       switch(type)
       {
   case "area" :
    let value=res["selection"];
    this.filteData(value);
     break;
     case "update" :
       console.log("table update called");
      
       break;
       }
       
       })

  }

  filteData(state:string):void
  {
    this.chartOptions.series[0].data=[];
    const format = 'yyyy-MM-dd';
    this.chartOptions.series[0].name=state;
    for (let i = 10; i >=0; i--) {
    let date: Date = new Date();  
    date.setDate(date.getDate()-i);
    let form=formatDate(date.setDate(date.getDate()-1), format, "en-In");
    let countrySetByDate=new Map(this.localStorage.dataBase.get(form));
    let covidTab=  countrySetByDate.get(state) as CovidTab;
    if(covidTab)
    {
    this.chartOptions.subtitle.text=state;
    this.chartOptions.series[0].data.push(covidTab.activeCase);
    }
    }
    this.updateFlag=true;
  }


getData():void
{

  const format = 'yyyy-MM-dd';
  let date: Date = new Date();  
  let date1: Date = new Date(); 
  
 date1.setDate(date.getDate()-10);
 let startDate=formatDate(date, format, "en-In");
 let endDate=formatDate(date1, format, "en-In");
  this.viewService.triggerResizeEvent();
 
  for (let i = 10; i >=0; i--) {
    let temp: Date = new Date();  
    temp.setDate(date.getDate()-i);
    let form=formatDate(temp, format, "en-In");
this.chartOptions.xAxis.categories.push(form);
  }
  let countryMap=new Map();

  this.covidApi.getIndiasCovidStat(endDate,startDate).subscribe( res =>{

    this.chartOptions.series=[  {
      name: "India",
      data: [],
    }];
     
    for (let i = 10; i >0; i--) {
      let temp: Date = new Date();  
      temp.setDate(date.getDate()-i);
      let form=formatDate(temp, format, "en-In");
      let state=new Map();
      let sn=1;
   let dateObj=res["dates"];
   let data=    dateObj[form];
   if(data!=undefined)
   {
   let countries=    data["countries"];
   let country=    countries["India"];
   let confirmedTotal=    country["today_confirmed"];
   this.chartOptions.series[0].data.push(confirmedTotal);
   let countryStat :CovidTab={
    sno :sn,
    state: country["name"],
    totalCase :country["today_confirmed"],
    activeCase:country["today_open_cases"],
    newCase :country["today_new_open_cases"],
    cured :country["today_recovered"],
    cch :country["today_new_recovered"],
    death: country["today_deaths"],
    dch: country["today_new_deaths"]
      };
      sn++;
      state.set(country["name"],countryStat);
    let states=country["regions"] as Object[];
    states.forEach(function(st)
    {
      let statInfo :CovidTab={
        sno :sn,
        state: st["name"],
        totalCase :st["today_confirmed"],
        activeCase:st["today_open_cases"],
        newCase :st["today_new_open_cases"],
        cured :st["today_recovered"],
        cch :st["today_new_recovered"],
        death: st["today_deaths"],
        dch: st["today_new_deaths"]
          };
          sn++;
          state.set(st["name"],statInfo);    
    }
    
    );
   

   }else
   {
    this.chartOptions.series[0].data.push(0);
   }
   countryMap.set(form,state);  
   
    }
    this.updateFlag=true;
  this.localStorage.dataBase=countryMap;

    let form1=formatDate(date.setDate(date.getDate()-1), format, "en-In");

    
    let dateObj=res["dates"];
   let data=    dateObj[form1];
   let countries=    data["countries"];
   let country=    countries["India"];
   this.localStorage.state="India";
  this.localStorage.totalCase=country["today_confirmed"];
   this.localStorage.activeCases=country["today_open_cases"];
   this.localStorage.newCase=country["today_new_open_cases"];
   this.localStorage.curedCases=country["today_recovered"];
   this.localStorage.newCured=country["today_new_recovered"];
   this.localStorage.totalDeath=country["today_deaths"];
   this.localStorage.newlDeath=country["today_new_deaths"];
    this.updateFlag=true;
  this.localStorage.sendEvent("","update");
  document.getElementById('loading')
  .style.display = 'none';
  this.localStorage.isScreenLoaded=true;
  console.log("data loaded");
  });

}


  ngOnInit(): void {
    const format = 'yyyy-MM-dd';
    let date: Date = new Date();  
    let date1: Date = new Date(); 
    this.getData();
   date1.setDate(date.getDate()-6);
   let startDate=formatDate(date, format, "en-In");
   let endDate=formatDate(date1, format, "en-In");
    this.viewService.triggerResizeEvent();
   
    for (let i = 10; i >=0; i--) {
      let temp: Date = new Date();  
      temp.setDate(date.getDate()-i);
      let form=formatDate(temp, format, "en-In");
this.chartOptions.xAxis.categories.push(form);


    }
  
  this.updateFlag=true;
   
  }
}
