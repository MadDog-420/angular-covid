import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { User } from '../user';
import { Location } from '@angular/common';

let user:User;

user = {
  usuario: 1,
  email: 'slay@example.com',
  nombre: "Hugh",
  apellido: "Jass",
  ciudad: "Puno",
  pais: "Peru",
  descript: "No tengas miedo de la verdad, porque necesitamos reconstruir las bases de la humanidad en la verdad"
}


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user=user;

  url:String;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location) { 
    this.url="https://www.jujuyaldia.com.ar/wp-content/uploads/2011/08/buscados.jpg";
  }

  ngOnInit() {
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = this.ab2str(event.target.result);
      }
    }
  }

  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  goBack(): void {
    this.location.back();
  }

  save(usuario:number,email:string,nombre:string,apellido:string,ciudad:string,pais:string,descript:string): void {
    user.usuario=usuario;
    user.email=email;
    user.nombre=nombre;
    user.apellido=apellido;
    user.ciudad=ciudad;
    user.pais=pais;
    user.descript=descript;
  }

}
