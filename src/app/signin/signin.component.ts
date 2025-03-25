import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  siginform:FormGroup=new FormGroup({})
  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router,
    private toastr:ToastrService,private ac:ActivatedRoute){}
  ngOnInit(): void {
    this.siginform=this.fb.group({
      name:['',],
      email:['',],
      password:['',],
      roleId:['',],
      lastName:['',],
      mobile:['',],
      gender:['',],
      dateOfBirth:['',],
      address:['',],
      // userId:['',]
    })
    let id=this.ac.snapshot.paramMap.get('id')
    if(id){
      this.userservice.getUser(id).subscribe({
        next: (data) => {
          if (data) {
            this.siginform.patchValue({
              name: data.name,
              email: data.email,
              password: data.password,
              roleId: data.roleId,
              lastName: data.userdetails?.lastName || '',
              mobile: data.userdetails?.mobile || '',
              gender: data.userdetails?.gender || '',
              dateOfBirth: data.userdetails?.dateOfBirth || '',
              address: data.userdetails?.address || '',
              // userId: data.userdetails?.userId || '',
            });
            // alert('Patched Successfully');
            this.toastr.success('Patched Successfully');
          }
        },
        error:(err)=>{},
        complete:()=>{}
      })
    }else{}
  }
  onSubmit(){
    let id=this.ac.snapshot.paramMap.get('id');
    if(id){
      this.userservice.updateUser(id,this.siginform.value).subscribe({
        next:(data)=>{
          // alert("Updated Successfully")
          this.toastr.success('Updated Successfully')
          this.route.navigate(['/admin'])
        },
        error:(err)=>{},
        complete:()=>{}
      })
    }
    else{
    this.userservice.createUser(this.siginform.value).subscribe({
      next:(data)=>{
        // alert("Created successfully");
        this.toastr.success('Created Successfully');
        this.route.navigate(['/admin'])
      },
      error:(err)=>{},
      complete:()=>{}
    })
  }
  }
}
