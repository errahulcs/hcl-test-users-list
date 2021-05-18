import { Component, OnInit } from '@angular/core';
import { FilterOption } from './filter-option.interface';
import { UsersService } from '../users.service';
import {UserData} from '../model/user-data';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name'
    },
    {
      value: 'username',
      text: 'User Name'
    },
    {
      value: 'email',
      text: 'Email'
    },
    {
      value: 'phone',
      text: 'Phone'
    },
    {
      value: 'website',
      text: 'Website'
    }
  ];

  userData: UserData[];
  filterGroup: FormGroup;
  filterText:string = '';
  selectedType:string = '';
  filterValue: UserData[];

  /* UseCompoment constructor for dependency injection */
  constructor(private readonly userService: UsersService) {}

  /*
  * ngOnInit Angular lifecycle hooks to initilize the forms and get the data.
  */
  public ngOnInit(): void {
    this.getUserData();
    this.initUserForm();
    this.filterChangeDetection()
  }

  /*
  * Gets Users List from the Users service.
  */
  getUserData() {
    this.userService.getUsers().subscribe((response: UserData[]) => {
      this.userData = response;
    });
  }

  /*
  * Initilize the user form with default 'name' selector
  */
  initUserForm() {
    this.filterGroup = new FormGroup({
      filterText: new FormControl('', [Validators.required]),
      selectedType: new FormControl('name')
    });
  }

  /*
  * Filter change detector to filter the result according to the search
  */
  filterChangeDetection() {
    this.filterGroup.get('filterText').valueChanges.subscribe((value) => {
      const selectedType = this.filterGroup.controls['selectedType'].value;
      this.filterValue = this.userData.filter((data) => (data[selectedType] != undefined && data[selectedType].toLowerCase().indexOf(value.toLowerCase()) !== -1));
    });
  }
}
