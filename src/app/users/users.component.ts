import { Component, OnInit } from '@angular/core';
import { FilterOption } from './filter-option.interface';
import { UsersService } from '../users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class UserData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

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

  constructor(private readonly userService: UsersService) {

  }

  public ngOnInit(): void {
    this.getUserData();
    this.initUserForm();
    this.filterChangeDetection()
  }

  getUserData() {
    this.userService.getUserData().subscribe((response: UserData[]) => {
      this.userData = response;
    });
  }

  initUserForm() {
    this.filterGroup = new FormGroup({
      filterText: new FormControl('', [Validators.required]),
      selectedType: new FormControl('name')

    });
  }

  filterChangeDetection() {
    this.filterGroup.get('filterText').valueChanges.subscribe((value) => {
      const selectedType = this.filterGroup.controls['selectedType'].value;
      this.filterValue = this.userData.filter((data) => (data[selectedType] != undefined && data[selectedType].toLowerCase().indexOf(value.toLowerCase()) !== -1));
    });
  }
}
