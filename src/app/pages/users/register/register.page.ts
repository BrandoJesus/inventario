import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService,
    private storage: AngularFireStorage) { }

  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: string= '';
  public password: string= '';
  public username: string= '';
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e) {
    // console.log('subir ', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();

  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe(user => {
        if(user) {
          console.log('user actual ', user);
          user.updateProfile({
            displayName: this.username,
            photoURL: this.inputImageUser.nativeElement.value
          }).then( () => {
            this.router.navigate(['admin/list-books']);
          }).catch( (error) => console.log('error ', error))
        }
      })
    }).catch(err => console.log('err ', err.message));
  }
  
  onLoginGoogle() {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onLoginFacebook() {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onloginRedirect() {
    this.router.navigate(['admin/list-books']); 
  }
  
  messageError(err) {
    console.log('err ', err.message);
  }

}
