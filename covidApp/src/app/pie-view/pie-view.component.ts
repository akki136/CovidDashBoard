import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import { CovidStat } from '../covid-stat';
import { CovidUserApiService } from '../covid-user-api.service';
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

  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "State Wise Covid Cases",
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
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
     
    ],
  }; // required
  constructor(private viewService: ViewServiceService,private covidApiService:CovidUserApiService) {}
  updateFlag=false;
  ngOnInit(): void {

    this.covidApiService.getIndiasCovidStats().subscribe(res =>
      {
        this.covidStats=res as CovidStat[];
      this.chartOptions.series =[ {
          name: "States",
          colorByPoint: true,
          data: [],
        }];
   
        
         this.covidStats.forEach(function(data)
         {
          if(data.state_name!=undefined&&data.state_name.length!=0)
          {
            var y1: number = +data.new_active;
          let piInfo :Pi={
            
            name: data.state_name,
            y :y1,
            sliced:false,
            selected:false
              }; 
              piObj.push(piInfo);
            }
         });
         this.chartOptions.series[0].data=piObj;
         this.updateFlag=true;
        
      }
      );
    this.viewService.triggerResizeEvent();
  }

}
