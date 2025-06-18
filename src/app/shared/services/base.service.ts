import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {inject} from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';

/**
 * Abstract base service class providing common CRUD operations for REST APIs endpoints.
 */
export abstract class BaseService<T> {
  /** HTTP headers configuration for JSON communication */
  protected httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  /** Base URL for the server API */
  protected serverBaseUrl: string = `${environment.serverBaseUrl}`;
  /** Endpoint path for the specific resource */
  protected resourceEndpoint: string = '/resources';
  /** HTTP client for making API request */
  protected http: HttpClient = inject(HttpClient);

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred:, ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  protected resourcePath(): string {
    return `${this.serverBaseUrl}${this.resourceEndpoint}`;
  }

  /**
   * Section CRUD operations
   * */
  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), resource, this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));
  }

  public getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.resourcePath(), this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));
  }

  public getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));
  }

  public update(id: any, resource: T): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(resource), this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));
  }

  public delete(id: any): Observable<T> {
    return this.http.delete<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));
  }

}
