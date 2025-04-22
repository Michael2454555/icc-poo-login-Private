import { Component, OnInit } from '@angular/core';
import { AuthP66Service } from '../../services/auth-p66.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _authP66:AuthP66Service,
              private router:Router
  ) { }

  ngOnInit() {
  }
  salir(){
    this._authP66.logOUT();
    this.router.navigateByUrl(`/login`);

  }

}
