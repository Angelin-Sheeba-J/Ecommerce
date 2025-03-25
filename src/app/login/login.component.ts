import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginform:FormGroup=new FormGroup({})
  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router,private toastr:ToastrService){}
  ngOnInit(): void {
    this.loginform=this.fb.group({
      email:['',],
      password:['',]
    })
  }
  onLogin() {
    this.userservice.getByToken(this.loginform.value.email, this.loginform.value.password).subscribe({
      next: (value) => {
        if (value.token) {
          sessionStorage.setItem('token', value.token);
          sessionStorage.setItem('roleId', value.roleId);
          sessionStorage.setItem('userId', value.userId);
          this.userservice.updateLoginStatus(true);
          this.toastr.success('Login Successfully');
  
          if (value.roleId == 1) {
            this.route.navigate(['/admin']);
          } else if (value.roleId == 2) {
            this.route.navigate(['/customer']);
          } else {
            this.route.navigate(['/productlist']);
          }
        }
      },
      error: (err) => {
        if (err.error === "Your account is deactivated. Please contact the administrator.") {
          this.toastr.error("Your account is deactivated. Please contact the administrator.");
        } else {
          this.toastr.error("Invalid Email or Password");
        }
      }
    });
  }
  
}
