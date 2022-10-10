import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Contato } from 'src/app/model/contato';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  insert(user: any) {
    this.db.list('usuarios').set(user.uid, {
      nome: user.nome,
      email: user.email
    });
  }

  insertContato(contato: Contato) {
    this.db.list('contatos').push(contato);
  }

  getContatos() {
    return this.db.list('contatos').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
      })
    );
  }

  removeContato(key: string) {
    this.db.list('contatos').remove(key);
  }


}
