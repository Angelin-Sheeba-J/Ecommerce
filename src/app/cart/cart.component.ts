import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  userId: string = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || ''; // Get current user's ID
    this.loadCart();
  }

  // ✅ Load Cart for Current User
  loadCart(): void {
    const storedCart = localStorage.getItem(`cart_${this.userId}`);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  // ✅ Remove Product from Cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cartItems));
    this.toastr.warning("Removed from Cart", "Success");
  }

  // ✅ Increase Quantity
  increaseQuantity(productId: number): void {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      product.quantity += 1;
      localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cartItems));
    }
  }

  // ✅ Decrease Quantity
  decreaseQuantity(productId: number): void {
    const product = this.cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cartItems));
    }
  }

  // ✅ Calculate Total Price
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ✅ Place Order (Clear Cart)
  placeOrder(): void {
    if (this.cartItems.length > 0) {
      localStorage.removeItem(`cart_${this.userId}`);
      this.cartItems = [];
      this.toastr.success("Order placed successfully!", "Success");
    }
  }
}
