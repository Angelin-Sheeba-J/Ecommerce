import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-seller',
  imports: [ReactiveFormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent implements OnInit {
    productform:FormGroup=new FormGroup({})
    selectedfile: File | null = null;
    imagePreview: string | null = null;

    constructor(private fb:FormBuilder,private userservice:UserService,private ac:ActivatedRoute,
      private toastr:ToastrService,private route:Router){}
    ngOnInit(): void {
      this.productform=this.fb.group({
        name:['',Validators.required],
        description:['',Validators.required],
        price:['',Validators.required],
        stock:['',Validators.required],
        category:['',Validators.required],
        imageurl:[''],
        userId:['',]
      })
      let id=this.ac.snapshot.paramMap.get('id');
      if(id){
        this.userservice.getProduct(id).subscribe({
          next:(data)=>{
            // console.log(data);
            // this.productform.patchValue(data);
            // if (data.imageurl) {
            //   this.imagePreview = data.imageurl; // ✅ Set image preview if available
            //   this.productform.patchValue({ imageurl: data.imageurl }); // ✅ Patch the form control
            // }
            this.productform.patchValue({
              name: data.name,
              description: data.description,
              price: data.price,
              stock: data.stock,
              category: data.category,
              userId: data.userId,
              // imageurl: data.imageurl // ✅ Patch the image URL
            });
    
            if (data.imageurl) {
              this.imagePreview = data.imageurl; // ✅ Display existing image
            }
            // alert("Product List Patched Successfully")
            this.toastr.success('Product Patched Successfully')
            // if (data.imageurl) {
            //   this.imagePreview = data.imageurl; // Store existing image URL
            // }
          },
          error:(err)=>{},
          complete:()=>{}
        })
      }else{}
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedfile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
    }
  } 

    onSubmit() {
      const formData = new FormData();
    
      // Append all form fields except the image
      Object.keys(this.productform.controls).forEach(key => {
        const value = this.productform.get(key)?.value;
        if (key !== 'imageurl') { // ❌ Don't append imageurl as text
          const value = this.productform.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      }
      });
    
      // Append the image file separately
      // if (this.selectedfile) {
      //   formData.append('Imageurl', this.selectedfile); // Ensure this matches the backend field name
      // } else {
      //   alert("Please select an image!");
      //   return;
      // }
      if (this.selectedfile) {
        formData.append('imageurl', this.selectedfile); // ✅ Append file if a new image is selected
      } else if (this.imagePreview && typeof this.imagePreview === 'string') {
        formData.append('imageurl', this.imagePreview); // ✅ Keep existing image URL if no new file is selected
      } else {
        alert("Please select an image!");
        return;
      }
    
      let id = this.ac.snapshot.paramMap.get('id');
      if (id) {
        this.userservice.updateProduct(id, formData).subscribe({
          next: () => {
            // alert('Product Updated Successfully');
            this.toastr.success('Product Updated Successfully');
            this.route.navigate(['/productlist']);
          },
          error: (err) => console.error(err)
        });
      } else {
        this.userservice.createProduct(formData).subscribe({
          next: () => {
            // alert('Product Created Successfully');
            this.toastr.success('Product Created Successfully');
            this.route.navigate(['/productlist']);
          },
          error: (err) => console.error(err)
        });
      }
    }
  }