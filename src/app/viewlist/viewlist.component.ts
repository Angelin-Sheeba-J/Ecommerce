import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserfilterPipe } from '../userfilter.pipe';

@Component({
  selector: 'app-viewlist',
  standalone: true,
  imports: [RouterLink, CommonModule, UserfilterPipe, FormsModule],
  templateUrl: './viewlist.component.html',
  styleUrl: './viewlist.component.css'
})
export class ViewlistComponent implements OnInit{
  user: any = [];
  roleId: string = '';
  userId: number = 0;
  selectedRole: string = 'all'; // Default: Show all users

  constructor(private userservice: UserService, private toastr: ToastrService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.roleId = sessionStorage.getItem('roleId') as string;
    this.userId = Number(sessionStorage.getItem('userId')); // Convert to number

    console.log('Role ID:', this.roleId);
    console.log('User ID:', this.userId);

    if (this.roleId) {
      this.userservice.getUsers().subscribe({
        next: (data) => {
          console.log(data);
          this.user = data; // Load all users initially
          console.log('Filtered Users:', this.user);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  }

  onDelete(id: any) {
    this.userservice.deleteUser(id).subscribe({
      next: () => {
        this.ngOnInit();
        this.toastr.success('Deleted Successfully');
      },
      error: () => {
        this.toastr.error('Failed to delete user');
      }
    });
  }

  toggleUserStatus(user: any): void {
    if (user.isActive) {
      this.userservice.deactivateUser(user.id).subscribe({
        next: () => {
          this.toastr.warning('User Deactivated Successfully');
          setTimeout(() => {
            user.isActive = false;
          });
        },
        error: () => {
          this.toastr.error('Failed to Deactivate User');
        }
      });
    } else {
      this.userservice.activateUser(user.id).subscribe({
        next: () => {
          this.toastr.success('User Activated Successfully');
          setTimeout(() => {
            user.isActive = true;
          });
        },
        error: () => {
          this.toastr.error('Failed to Activate User');
        }
      });
    }
  }
  
}