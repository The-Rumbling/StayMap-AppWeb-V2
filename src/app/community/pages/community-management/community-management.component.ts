import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {CommunityService} from '../../services/community.service';
import {Community} from '../../model/community.entity';
import {
  CommunityCreateAndEditComponent
} from '../../components/community-create-and-edit/community-create-and-edit.component';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../users/services/user.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {SearchService} from '../../../shared/services/search.service';

@Component({
  selector: 'app-community-management',
  imports: [
    NgForOf,
    NgStyle,
    MatButton,
    CommunityCreateAndEditComponent,
    NgIf,
    MatDialogModule
  ],
  templateUrl: './community-management.component.html',
  styleUrl: './community-management.component.css'
})
export class CommunityManagementComponent implements OnInit, AfterViewInit{
  isLoggedIn:boolean = false;
  protected communityData!: Community;

  protected editMode: boolean = false;
  protected communityService: CommunityService = inject(CommunityService);
  protected dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;

  private searchValue = '';
  private searchService: SearchService = inject(SearchService);

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog ) {
    this.userService.currentUser$.subscribe(user => {
      this.isLoggedIn=!!user;
    });
    this.editMode = false;
    this.communityData = new Community({});
    this.dataSource = new MatTableDataSource();
    console.log(this.communityData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllCommunities();
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchValue = term;
    });
  }

  get filteredCommunities() {
    const term = this.searchValue.trim().toLowerCase();

    return this.dataSource.data.filter(community => {
      return term === '' || community.name.toLowerCase().includes(term);
    });
  }

  private getAllCommunities() {
    this.communityService.getAll().subscribe((response: Array<Community>) => {
      console.log(' Comunidades cargadas desde el JSON:', response);
      this.dataSource.data = response;
    });
  }

  private createCommunity() {
    if (!this.communityData.id) {
      this.communityData.id = Date.now();
    }

    this.communityService.create(this.communityData).subscribe(() => {
      this.getAllCommunities();
    });
  }

  private updateCommunity() {
    let communityToUpdate = this.communityData;
    this.communityService.update(communityToUpdate.id, communityToUpdate).subscribe((response: Community) => {
      let index = this.dataSource.data.findIndex((community: Community) => community.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.formVisible = false;
  }

  private resetEditState() {
    this.communityData = new Community({});
    this.editMode = false;
  }

  protected onCommunityAddRequested(item: Community) {
    this.communityData = item;
    this.createCommunity();
    this.resetEditState();
  }

  protected onCommunityUpdateRequested(item: Community) {
    this.communityData = item;
    this.updateCommunity();
    this.formVisible = false;
  }

  protected formVisible = false;

  protected onAddCommunityClicked() {
    this.resetEditState();

    const dialogRef = this.dialog.open(CommunityCreateAndEditComponent, {
      panelClass: 'custom-dialog-container',
      data: { community: this.communityData, editMode: false }
    });

    dialogRef.afterClosed().subscribe((result: Community) => {
      if (result) {
        this.onCommunityAddRequested(result);
      }
    });
  }

  protected onCommunityCardClicked(communityId: number) {
    this.router.navigate(['/communities', communityId]);
  }
}
