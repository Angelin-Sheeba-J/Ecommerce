import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-rolelist',
  imports: [RouterLink, CommonModule],
  templateUrl: './rolelist.component.html',
  styleUrl: './rolelist.component.css'
})
export class RolelistComponent implements OnInit {
  role: any;
  users: any[] = [];
  selectedRoleId: number | null = null;

  @ViewChild('userDetailsModal', { static: false }) userDetailsModal!: ElementRef;

  constructor(private userservice: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.userservice.getRoles().subscribe({
      next: (data) => {
        this.role = data;
        console.log('Roles:', data);
      },
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  onDelete(id: any) {
    this.userservice.deleteRole(id).subscribe({
      next: () => {
        this.getRoles();
        this.toastr.success('Role Deleted Successfully');
      },
      error: (err) => console.error('Error deleting role:', err)
    });
  }

  onViewUsers(roleId: number) {
    this.selectedRoleId = roleId;
    this.userservice.getUsers().subscribe({
      next: (data) => {
        this.users = data.filter((user: any) => user.roleId === roleId);

        // Open the modal dynamically
        setTimeout(() => {
          if (this.userDetailsModal?.nativeElement) {
            const modalElement = this.userDetailsModal.nativeElement;
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
          } else {
            console.error('Bootstrap modal element not found.');
          }
        }, 0);
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
}
