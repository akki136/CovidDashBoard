 
import { Component, OnInit, Input } from "@angular/core";

import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import { LocalStorageService } from "../local-storage.service";
import { ViewServiceService } from "../view-service.service";
HC_exporting(Highcharts);

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  public Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
   // required
  public chartOptions: any = {
    chart: {
      type: "area",
      backgroundColor: null,
      borderWidth: 0,
      margin: [2, 2, 2, 2],
      height: 60,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
      startOnTick: false,
      endOnTick: false,
      tickOptions: [],
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
      startOnTick: false,
      endOnTick: false,
      tickOptions: [],
    },
    tooltip: {
      split: true,
      outside: true,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        data: [20, 30, 40, 50, 60],
      },
    ],
  }; // required

  @Input() public label: string;
  @Input() public total: number;
  @Input() public percentage: number;
  @Input() public msg: string;
  constructor(private viewService: ViewServiceService,private  localStorage:LocalStorageService) {}

  ngOnInit(): void {
    this.viewService.triggerResizeEvent();
  }
}
