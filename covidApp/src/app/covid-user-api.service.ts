import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from './user-credentials';
import { Constants } from './constants';
import { catchError, tap } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { Status } from './status';
import { CovidStat } from './covid-stat';
@Injectable({
  providedIn: 'root'
})
export class CovidUserApiService {

  constructor(private httpClient: HttpClient) { }

  public attemptLogin(logininfo:UserCredentials)
  {
    return this.httpClient.post<UserCredentials>(Constants.COVID_AUTH_URL+"loginUser",logininfo).pipe( catchError(this.handleError('attemptLogin', logininfo)))
  }


  public saveUser(logininfo:UserCredentials)
  {
    return this.httpClient.post<Status>(Constants.COVID_AUTH_URL+"AddAccountInfo",logininfo).pipe( catchError(this.handleError('saveUser', logininfo)))
  }



  public  getIndiasCovidStats()
  {
    return this.httpClient.get<CovidStat[]>(Constants.COVID_SERVER_URL).pipe(
       catchError(this.handleErrorCovid<CovidStat[]>('getIndiasCovidStats')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Api Error "+error.error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(error.error);
    };
  }

  public  getIndiasCovidStat(stDate :string,endDate:string)
  {
    return this.httpClient.get<Object>(Constants.COVID_GRAPH_URL+stDate+"&date_to="+endDate).pipe(
       catchError(this.handleErrorCovid<Object>('getIndiasCovidStat')));
  }

 

  private handleErrorCovid<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error("Api Error "+error.error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(null);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
}
