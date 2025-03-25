import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {
  user: any[] = [];   // Stores all products
  filteredProducts: any[] = []; // Stores search results
  searchQuery: string = '';
  customer: boolean = false;

  constructor(private userservice: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    const roleid = sessionStorage.getItem('roleId');
    this.customer = roleid === '2';
    this.loadProducts(); // ✅ Fetch products on component load
  }

  loadProducts(): void {
    this.userservice.getProducts().subscribe({
      next: (data) => {
        this.user = data;
        this.filteredProducts = data; // ✅ Initialize filteredProducts with all products
      },
      error: (err) => {
        console.error("Error fetching products:", err);
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = this.user; // ✅ Reset to all products if search query is empty
      return;
    }

    this.userservice.searchProducts(this.searchQuery).subscribe({
      next: (data) => {
        console.log("Filtered products:", data);
        this.filteredProducts = data;  // ✅ Assign correct search results
      },
      error: (err) => {
        console.error("Search error:", err);
      }
    });
  }

  onDelete(id: any): void {
    this.userservice.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('Deleted Successfully');
        this.loadProducts(); // ✅ Refresh product list after deletion
      },
      error: (err) => {
        console.error("Delete error:", err);
      }
    });
  }

  onImageError(use: any): void {
    console.error("Image failed to load:", use.imageurl);
    use.imageurl = "assets/default-image.jpg";  // ✅ Use default image if loading fails
  }
}

