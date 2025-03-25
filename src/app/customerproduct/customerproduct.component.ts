import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerproduct',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './customerproduct.component.html',
  styleUrl: './customerproduct.component.css'
})
export class CustomerproductComponent implements OnInit {
  user: any[] = [];   
  filteredProducts: any[] = []; 
  searchQuery: string = '';
  wishlist: any[] = [];
  userId: string = '';

  constructor(private userservice: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    this.loadProducts(); 
    this.loadWishlist();  // ✅ Load wishlist from localStorage
  }

  loadProducts(): void {
    this.userservice.getProducts().subscribe({
      next: (data) => {
        this.user = data;
        this.filteredProducts = data; 
      },
      error: (err) => {
        console.error("Error fetching products:", err);
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = this.user;
      return;
    }
    this.userservice.searchProducts(this.searchQuery).subscribe({
      next: (data) => {
        this.filteredProducts = data;
      },
      error: (err) => {
        console.error("Search error:", err);
      }
    });
  }

  // ✅ Load wishlist from localStorage
  loadWishlist(): void {
    const storedWishlist = localStorage.getItem(`wishlist_${this.userId}`);
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  // ✅ Check if product is in wishlist
  isInWishlist(product: any): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  // ✅ Toggle wishlist
  toggleWishlist(product: any): void {
    if (this.isInWishlist(product)) {
      this.wishlist = this.wishlist.filter(item => item.id !== product.id);
      this.toastr.warning("Removed from Wishlist", "Success");
    } else {
      this.wishlist.push(product);
      this.toastr.success("Added to Wishlist", "Success");
    }

    // ✅ Store wishlist per user
    localStorage.setItem(`wishlist_${this.userId}`, JSON.stringify(this.wishlist));
  }

  onImageError(use: any): void {
    use.imageurl = "assets/default-image.jpg";
  }

}
