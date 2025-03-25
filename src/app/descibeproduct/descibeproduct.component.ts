import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descibeproduct',
  imports: [CommonModule,RouterLink],
  templateUrl: './descibeproduct.component.html',
  styleUrl: './descibeproduct.component.css'
})
export class DescibeproductComponent implements OnInit {
  product: any = null;
  cart: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private toastr: ToastrService
  ) {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: any): void {
    this.userservice.getProduct(id).subscribe({
      next: (data) => {
        if (data) {
          this.product = { ...data, quantity: 1 }; // ✅ Ensure quantity exists
        }
      },
      error: () => {
        this.toastr.error("Product not found", "Error");
      }
    });
  }
  
  addToCart(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      this.toastr.error("User not logged in", "Error");
      return;
    }
  
    if (!this.product || typeof this.product.id === 'undefined') {
      this.toastr.error("Invalid product data", "Error");
      return;
    }
  
    const userCartKey = `cart_${userId}`;
    
    // Ensure cart is a valid array
    let cart: any[] = [];
    try {
      const storedCart = localStorage.getItem(userCartKey);
      cart = storedCart ? JSON.parse(storedCart) : [];
      if (!Array.isArray(cart)) {
        cart = []; // Reset if invalid data found
      }
    } catch (error) {
      console.error("Error parsing cart data:", error);
      cart = [];
    }
  
    // Find the product in the cart safely
    const existingProduct = cart.find((item: any) => item?.id === this.product?.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1; // ✅ Increase quantity if already in cart
    } else {
      this.product.quantity = 1; // ✅ Ensure quantity is set for new items
      cart.push({ ...this.product }); // Use a new object to avoid mutations
    }
  
    localStorage.setItem(userCartKey, JSON.stringify(cart));
    this.toastr.success("Added to cart!", "Success");
  }

}
