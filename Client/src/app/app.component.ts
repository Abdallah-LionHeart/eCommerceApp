import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';


  constructor(private http: HttpClient) {


  }
  ngOnInit(): void {
    this.http.get('http://localhost:5001/api/products').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => {
        console.log('request completed');
        console.log('extra statment');
      }

    })
  }
}