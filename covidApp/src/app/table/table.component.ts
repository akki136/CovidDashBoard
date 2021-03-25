import { formatDate } from '@angular/common';
import { ViewChild,HostListener, AfterViewInit  } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { CovidStat } from '../covid-stat';
import { CovidTab } from '../covid-tab';
import { CovidUserApiService } from '../covid-user-api.service';
import { LocalStorageService } from '../local-storage.service';


 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit ,AfterViewInit{

  covidData: CovidTab[] = []; 
  covidStats:CovidStat[] = [];
  displayedColumns: string[] = ["sno", "state", "totalCase","activeCase", "tch","cured","cch","death","dch"];
  dataSource = new MatTableDataSource<CovidTab>(this.covidData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
constructor(private covidApiService:CovidUserApiService,private localStorage :LocalStorageService)
{
  this.localStorage.getEvent().subscribe(res=>{
   let type=res["type"];
    switch(type)
    {
case "table" :
  this.dataSource.filter=res["selection"];
  break;
  case "update" :
    console.log("table update called");
   this.updateView();
    break;
    }
    
    })

  
  

}
  ngAfterViewInit(): void {
    
  }

updateView() :void
{
  const format = 'yyyy-MM-dd';
  this.covidData=[];
  let date: Date = new Date();  
  let form=formatDate(date.setDate(date.getDate()-1), format, "en-In");
  let countrySetByDate=new Map(this.localStorage.dataBase.get(form));
  let covidTab=  countrySetByDate.get('India') as CovidTab;
  for (let item of countrySetByDate.values()) {
    let covidTab=  item as CovidTab;
    this.covidData.push(covidTab);
}
this.dataSource = new MatTableDataSource<CovidTab>(this.covidData);
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
}


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  let data=  this.dataSource.filteredData;
  if(data.length!=0)
  {
    this.localStorage.sendEvent(data[0]["state"].trim(),'pie');
    this.localStorage.sendEvent(data[0]["state"].trim(),"area");
  }
  }

rowSelected(row:CovidTab,value:string,type:string) {
 
  this.localStorage.tableSelected=row.state;
  this.localStorage.sendEvent(row.state,'pie');
  this.localStorage.sendEvent(row.state,"area");
}

@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  this.localStorage.selected="";
  this.dataSource.filter="";
  this.localStorage.sendEvent('India','pie');
  this.localStorage.sendEvent('India',"area");
}



  ngOnInit() {


  //   this.covidApiService.getIndiasCovidStats().subscribe(res =>
  //     {
  //        this.covidStats=res as CovidStat[];
  //        this.covidStats.forEach(function(data)
  //        {
  //          if( data.state_name.length!=0)
  //          {
            
           
  //         let loginInfo :CovidTab={
  //           sno :data.sno,
  //           state: data.state_name,
  //           totalCases :data.new_active,
  //           tch :(data.new_active-data.active),
  //           cured :data.new_cured,
  //           cch :(data.new_cured-data.cured),
  //           death: data.new_death,
  //           dch: (data.new_death-data.death)
  //             };
  //             covidData.push(loginInfo);
  //           }
  //        });
  //        this.dataSource = new MatTableDataSource<CovidTab>(covidData);
  //        this.dataSource.paginator = this.paginator;
  //        this.dataSource.sort = this.sort;
  //     }
  //     );
  //   this.dataSource.paginator = this.paginator;
  }

}
