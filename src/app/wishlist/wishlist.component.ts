import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  cart: any[] = [];
  userId: string = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || ''; // Get current user's ID
    this.loadWishlist();
    this.loadCart();
  }

  // ✅ Load Wishlist for Current User
  loadWishlist(): void {
    const storedWishlist = localStorage.getItem(`wishlist_${this.userId}`);
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  // ✅ Load Cart for Current User
  loadCart(): void {
    const storedCart = localStorage.getItem(`cart_${this.userId}`);
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  // ✅ Remove Product from Wishlist
  removeFromWishlist(product: any): void {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
    localStorage.setItem(`wishlist_${this.userId}`, JSON.stringify(this.wishlist));
    this.toastr.warning("Removed from Wishlist", "Success");
  }

  // ✅ Add Product to Cart for the Current User
  addToCart(product: any): void {
    // Load user's cart
    const storedCart = localStorage.getItem(`cart_${this.userId}`);
    this.cart = storedCart ? JSON.parse(storedCart) : [];

    // Check if product is already in cart
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      this.toastr.info("Already in Cart", "Info");
    } else {
      this.cart.push({ ...product, quantity: 1 }); // Set initial quantity
      localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cart));
      this.toastr.success("Added to Cart", "Success");

      // ✅ Remove from wishlist after adding to cart
      this.removeFromWishlist(product);
    }
  }
}
