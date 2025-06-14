import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../User/Services/User.service';
import { IUserProfile } from '../../../../User/Interface/User-pofile.interface';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserProfile } from '../../../../User/Models/User-profile';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent implements OnInit {
  @Input() customerName: string = '';
  @Input() customerPhone: number = 0;
  @Input() customerEmail: string = '';
  @Input() customerAddres: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
}
