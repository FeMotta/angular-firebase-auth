import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserService } from 'src/app/shared/user/user.service';
import { Observable } from 'rxjs';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contato: Contato = new Contato();
  contatos: Observable<any> = new Observable<any>();

  constructor(private auth: AuthService, private contatoService: UserService) { }

  ngOnInit(): void {
    this.contatos = this.contatoService.getContatos()
  }

  onSubmit() {
    this.contatoService.insertContato(this.contato);
  }

  remove(key: string) {
    this.contatoService.removeContato(key);
  }

  logout() {
    this.auth.logout();
  }

}
