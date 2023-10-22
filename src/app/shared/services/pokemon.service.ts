import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokedex } from '../models/pokedex';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pokedex>{
    return this.http.get<Pokedex>(`${this.pokemonURL}/pokedex/1`);
  }

  getByGen(gen: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/generation/${gen}`);
  }

  getByType(type: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/type/${type}`);
  }

}
