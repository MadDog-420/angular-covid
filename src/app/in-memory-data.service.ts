import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {
        usuario: 1,
        email: 'slay@example.com', 
        nombre: "Hugh",
        apellido: 'Jass',
        ciudad: 'Puno',
        pais: 'Peru',
        descript: 'No tengas miedo de la verdad, porque necesitamos reconstruir las bases de la humanidad en la verdad',
      }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(hero: User[]): number {
    return hero.length > 0 ? Math.max(...hero.map(hero => hero.usuario)) + 1 : 1;
  }
}