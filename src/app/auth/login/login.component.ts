import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/login.service';
import { SnackbarService } from '../servicios/snackbar.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public form!:FormGroup;
  submitted= false;
  
  constructor(private formBuiler:FormBuilder, private _ls:LoginService,
    private _sb:SnackbarService,){ }

  ngOnInit(){
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.form=this.formBuiler.group({
      email: ['', [
        Validators.required, Validators.email, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      ],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  guardar(){
    this.submitted= true;
    const f = this.form.value;
    if(this.form.valid){
      let json = this.returnJson(f);
      this.loguearChelas(json);
    }else{
      this.submitted= false;
    }
  }

  returnJson(f:any){
    let json = {
      usuario: {
        email: f.email,
        password: f.password
      }
    }
    return json;
  }

  loguearChelas(json:any){
    this._ls.auth(json).subscribe((res:any) =>{
      if (res.status) {
        this._sb.open(res.mensaje); 
        localStorage.setItem('user',JSON.stringify(res))   
      } else {
        this._sb.open(res.mensaje,'text-danger');
      }
    })    
  }

  get fc() {
    return this.form.controls;
  }


  
}
