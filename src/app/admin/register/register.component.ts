import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  register() {
    this.auth.signup(this.email, this.senha, this.nome);
  }

}
