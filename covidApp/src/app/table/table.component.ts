import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CovidStat } from '../covid-stat';
import { CovidUserApiService } from '../covid-user-api.service';
import { LocalStorageService } from '../local-storage.service';
export interface CovidTab {
  sno: number;
  totalCases: number;
  tch: number;
  cured: number;
  cch: number;
  death: number;
  dch: number;
  state: string;
}

const covidData: CovidTab[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  covidStats:CovidStat[] = [];
  displayedColumns: string[] = ["sno", "state", "totalCases", "tch","cured","cch","death","dch"];
  dataSource = new MatTableDataSource<CovidTab>(covidData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

constructor(private covidApiService:CovidUserApiService,private localStorage :LocalStorageService)
{

}

  ngOnInit() {


    this.covidApiService.getIndiasCovidStats().subscribe(res =>
      {
         this.covidStats=res as CovidStat[];
         this.covidStats.forEach(function(data)
         {
          let loginInfo :CovidTab={
            sno :data.sno,
            state: data.state_name,
            totalCases :data.new_active,
            tch :(data.new_active-data.active),
            cured :data.new_cured,
            cch :(data.new_cured-data.cured),
            death: data.new_death,
            dch: (data.new_death-data.death)
              };
              covidData.push(loginInfo);
         });
         this.dataSource = new MatTableDataSource<CovidTab>(covidData);
         this.dataSource.paginator = this.paginator;
      }
      );
    this.dataSource.paginator = this.paginator;
  }

}
