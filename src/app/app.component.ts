import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {debounceTime, distinctUntilChanged, filter, Subject, Subscription} from 'rxjs';
import {UserService} from './users/services/user.service';
import {User} from './users/model/user.entity';
import {SearchService} from './shared/services/search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgForOf, MatToolbar, MatFormField, MatLabel, MatButton, MatIconButton, MatInput, MatSuffix, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  private searchService = inject(SearchService)
  private userService = inject(UserService);

  currentUser: User = new User({});
  isLoggedIn: boolean = false;
  showToolbar = true;
  options = [
    {link: 'concerts', label: 'Concerts' },
    { link: 'map', label: 'Map' },
    { link: 'communities', label: 'Communities' },
  ];
  protected searchInput: string = "";
  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private translate:  TranslateService, private router:Router) {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.showToolbar = !(event.url.includes('/login') || event.url.includes('/register'));
    });
  }

  onSearchInput(value: string) {
    this.searchInput = value;
    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.searchService.setSearchTerm(term);
      });
  }
}
