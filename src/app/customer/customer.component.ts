import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  imports: [RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  user: any = [];
  roleId: string = '';
  userId: number = 0;
  constructor(private userservice:UserService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.roleId=sessionStorage.getItem('roleId') as string;
    this.userId = Number(sessionStorage.getItem('userId'));
    this.userservice.getUsers().subscribe({
      next:(data)=>{
        this.user = data.filter((u: any) => u.id == this.userId); 
      },
      error:(err)=>{},
      complete:()=>{}
    })
}
onDelete(id:any){
  this.userservice.deleteUser(id).subscribe({
    next:(data)=>{
      this.ngOnInit();
      // alert("Deleted Successfully")
      this.toastr.success('Deleted Successfully');
    },
    error:(err)=>{
    },
    complete:()=>{}
  })
}
}
