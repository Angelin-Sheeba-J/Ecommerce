import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{
  roleform:FormGroup=new FormGroup({})
  constructor(private fb:FormBuilder,private useservice:UserService,private route:Router,private toaster:ToastrService){}
  ngOnInit(): void {
    this.roleform=this.fb.group({
      name:['',]
    })
  }
  onSubmit(){
    this.useservice.createRole(this.roleform.value).subscribe({
      next:(data)=>{
        // alert("Role Created Successfully");
        this.toaster.success('Role Created Successfully');
        this.route.navigate(['/rolelist']);
      },
      error:(err)=>{
      },
      complete:()=>{}
    })
  }
}
