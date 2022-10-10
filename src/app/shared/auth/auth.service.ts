import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService) { }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential) => {
        var user = userCredential.user;
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  signup(email: string, password: string, nome: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        var userObj = {
          uid: user?.uid,
          nome: nome,
          email: email
        };
        this.userService.insert(userObj);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
  
}
