import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTerm.asObservable();

  public setSearchTerm(term: string): void {
    this.searchTerm.next(term);
  }
}
