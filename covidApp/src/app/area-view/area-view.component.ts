import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
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
  public chartOptions: any = {
    chart: {
      type: "area",
    },
    title: {
      text: "Covid Cases of last 7 Days",
    },
    subtitle: {
      text: "Dashboard",
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
        text: "Covid Cases (In Lakhs)",
      },
      labels: {
        formatter: function () {
          return this.value / 10;
        },
      },
    },
    tooltip: {
      split: true,
      valueSuffix: " Covid Cases",
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
  constructor(private viewService: ViewServiceService,private covidApi : CovidUserApiService,private  localStorage:LocalStorageService) {}

  ngOnInit(): void {
    const format = 'yyyy-MM-dd';
    let date: Date = new Date();  
    let date1: Date = new Date(); 
    
   date1.setDate(date.getDate()-6);
   let startDate=formatDate(date, format, "en-In");
   let endDate=formatDate(date1, format, "en-In");
    this.viewService.triggerResizeEvent();
   
    for (let i = 6; i >=0; i--) {
      let temp: Date = new Date();  
      temp.setDate(date.getDate()-i);
      let form=formatDate(temp, format, "en-In");
this.chartOptions.xAxis.categories.push(form);
    }
  
   
    this.covidApi.getIndiasCovidStat(endDate,startDate).subscribe( res =>{
      this.chartOptions.series=[  {
        name: "India",
        data: [],
      }];

 
      for (let i = 6; i >0; i--) {
        let temp: Date = new Date();  
        temp.setDate(date.getDate()-i);
        let form=formatDate(temp, format, "en-In");
     let dateObj=res["dates"];
     let data=    dateObj[form];
     if(data!=undefined)
     {
     let countries=    data["countries"];
     let country=    countries["India"];
     let confirmedTotal=    country["today_confirmed"];
     this.chartOptions.series[0].data.push(confirmedTotal);
     }
      }
     
      let form1=formatDate(date.setDate(date.getDate()-1), format, "en-In");
      let dateObj=res["dates"];
     let data=    dateObj[form1];
     let countries=    data["countries"];
     let country=    countries["India"];
     this.localStorage.activeCases=country["today_open_cases"];
     this.localStorage.newCase=country["today_new_open_cases"];
     this.localStorage.curedCases=country["today_recovered"];
     this.localStorage.newCured=country["today_new_recovered"];
     this.localStorage.totalDeath=country["today_deaths"];
     this.localStorage.newlDeath=country["today_new_deaths"];
      this.updateFlag=true;


    });
  }
}
