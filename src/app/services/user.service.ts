import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  url:string='https://localhost:7062/api/User'

  constructor(private http:HttpClient) { }

  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
  
  logout() {
    sessionStorage.clear();
    this.updateLoginStatus(false);
  }
  private getToken(): string | null {
    return sessionStorage.getItem('user');
  }

  getUsers(): Observable<any> {
    // var header:any={Authorization :'Bearer'+this.getToken}
    return this.http.get(this.url);
  }
  getUser(id: any): Observable<any> {
    // var header:any={Authorization :'Bearer'+this.getToken}
    return this.http.get(`${this.url}/${id}`);
  }
  createUser(users: any): Observable<any> {
    // var header:any={Authorization :'Bearer'+this.getToken}
    return this.http.post(this.url, users);
  }
  updateUser(id: any, users: any): Observable<any> {
    // var header:any={Authorization :'Bearer'+this.getToken}
    return this.http.put(`${this.url}/${id}`, users);
  }
  deleteUser(id: any): Observable<any> {
    // var header:any={Authorization :'Bearer'+this.getToken}
    return this.http.delete(`${this.url}/${id}`);
  }
  getByToken(email:any,password:any):Observable<any>{
    return this.http.get(this.url+'/'+email+'/'+password);
  }
  activateUser(id: number): Observable<any> {
    return this.http.put(`${this.url}/activate/${id}`, {});
  }
  
  deactivateUser(id: number): Observable<any> {
    return this.http.put(`${this.url}/deactivate/${id}`, {});
  }
 
  api:string="https://localhost:7062/api/Userdetails"
  getUsersdetail(): Observable<any> {
    return this.http.get(this.api);
  }
  getUserdetail(id: any): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
  createUserdetail(users: any): Observable<any> {
    return this.http.post(this.api, users);
  }
  updateUserdetail(id: any, users: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, users);
  }
  deleteUserdetail(id: any): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  apiurl:string="https://localhost:7062/api/Product"
  getProducts(): Observable<any> {
    return this.http.get(this.apiurl);
  }
  getProduct(id: any): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }
  createProduct(users: FormData): Observable<any> {
    return this.http.post(this.apiurl, users);
  }
  updateProduct(id: any, users: FormData): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, users);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiurl}/search?query=${encodeURIComponent(query)}`);
  }
  
  // getUserProducts(userId: number): Observable<any> {
  //   return this.http.get(`${this.apiurl}/GetUserProducts/${userId}`);
  //}
  apiurlr:string="https://localhost:7062/api/Role"
  getRoles(): Observable<any> {
    return this.http.get(this.apiurlr);
  }
  getRole(id: any): Observable<any> {
    return this.http.get(`${this.apiurlr}/${id}`);
  }
  createRole(users: any): Observable<any> {
    return this.http.post(this.apiurlr, users);
  }
  deleteRole(id: any): Observable<any> {
    return this.http.delete(`${this.apiurlr}/${id}`);
  }
}
