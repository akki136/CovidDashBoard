import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import { CovidStat } from '../covid-stat';
import { CovidTab } from '../covid-tab';
import { CovidUserApiService } from '../covid-user-api.service';
import { LocalStorageService } from '../local-storage.service';
import { Pi } from '../pi';
import { ViewServiceService } from '../view-service.service';

const piObj:Pi[] =[];

@Component({
  selector: 'app-pie-view',
  templateUrl: './pie-view.component.html',
  styleUrls: ['./pie-view.component.css']
})


export class PieViewComponent implements OnInit {
  covidStats:CovidStat[] = [];
  updateFlag=false;
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      events: {
        click: function (e) {
          //alert('Chart container clicked at: ' + e.yAxis[0].value);
        }
      }
    },
    title: {
      text: "Covid Cases (Regional Statistics)",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        point: {
          events: {
              click: function(e) {
                this.setValue(e.point.name);
              }.bind(this)
          }
      },
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
     
    ],
  }; // required

setValue(data:string):void
{
this.localStorage.selected=data;
this.localStorage.sendEvent(data,"table");
this.localStorage.sendEvent(data,"area");
this.filtercards(data);
}
  constructor(private viewService: ViewServiceService,private covidApiService:CovidUserApiService,public localStorage:LocalStorageService) {
    this.localStorage.getEvent().subscribe(res=>{
      let seqNo=0;
let isPending=true;
let type=res["type"];
    switch(type)
    {
case "pie" :

{
this.filterData(seqNo,isPending,res["selection"]);
}
  break;
  case "update" :
   console.log("pie update called");
  this.updateView();
     break;
    }
     
      })
  }

filterData(seqNo :number,isPending:boolean,selection:string) : void
{
  while((seqNo<this.chartOptions.series[0].data.length)&&isPending)
  {

let    temp=  this.chartOptions.series[0].data[seqNo];
if(temp==undefined)
{
 isPending=false;
 continue;
}
if(temp.name==selection)
{
 seqNo=temp.seqNo;
 this.chartOptions.series[0].data[seqNo].selected=true;
     this.chartOptions.series[0].data[seqNo].sliced=true;
     this.updateFlag=true;     
    this.chartOptions.tooltip.refresh= this.chartOptions.series[0].data[seqNo];
    this.filtercards(selection);
    
}else
{
this.chartOptions.series[0].data[seqNo].selected=false;
this.chartOptions.series[0].data[seqNo].sliced=false;
this.updateFlag=true;     
this.chartOptions.tooltip.refresh= this.chartOptions.series[0].data[seqNo]; 
}
seqNo++;
  }
}


filtercards(state:string):void
{
  const format = 'yyyy-MM-dd';
  let date: Date = new Date();  
  let form=formatDate(date.setDate(date.getDate()-1), format, "en-In");
  let countrySetByDate=new Map(this.localStorage.dataBase.get(form));
  let covidTab=  countrySetByDate.get(state) as CovidTab;
  this.localStorage.state=covidTab.state;
  this.localStorage.totalCase=covidTab.totalCase;
  this.localStorage.activeCases=covidTab.activeCase;
  this.localStorage.newCase=covidTab.newCase;
  this.localStorage.curedCases=covidTab.cured;
  this.localStorage.newCured=covidTab.cch;
  this.localStorage.totalDeath=covidTab.death;
  this.localStorage.newlDeath=covidTab.dch;
  
}
  
updateView() :void
{
  this.chartOptions.series =[ {
    name: "covid infection ratio",
    colorByPoint: true,
    data: [],
  }];

  let i=0;
  const format = 'yyyy-MM-dd';

let date: Date = new Date();  
let form=formatDate(date.setDate(date.getDate()-1), format, "en-In");
let countrySetByDate=new Map(this.localStorage.dataBase.get(form));

for (let item of countrySetByDate.values()) {
let covidTab=  item as CovidTab;
if(covidTab.state!=undefined&&covidTab.state.length!=0)
{
var y1: number ;
y1=covidTab.totalCase;
let piInfo :Pi={

name: covidTab.state,
y :y1,
seqNo :i,
selected :false,
sliced:false
  }; 
  i++;
  piObj.push(piInfo);
}
}
   this.covidStats.forEach(function(data)
   {
    if(data.state_name!=undefined&&data.state_name.length!=0)
    {
      var y1: number = +data.new_active;
    
    let piInfo :Pi={
      
      name: data.state_name,
      y :y1,
      seqNo :i,
      selected :false,
      sliced:false
        }; 
        i++;
        piObj.push(piInfo);
      }
   });
   this.chartOptions.series[0].data=piObj;
   this.updateFlag=true;
  

this.viewService.triggerResizeEvent();

}

  ngOnInit(): void {

    
        
      
  }

}
