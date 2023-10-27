import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokedex } from '../models/pokedex';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getNationalDex(): Observable<Pokemon[]>{
    return this.http.get(`${this.pokemonURL}/pokedex/1`)
      .pipe(
        map(
          (result: any) => {
            return result.pokemon_entries
            .map(
              (entry: any) => {
                return entry.pokemon_species as Pokemon;
              }
            ) as Pokemon[];
          }
        )
      );
  }

  getPokemonsPagination(offset: number, limit: number): Observable<Pokemon[]>{
    return this.http.get(`${this.pokemonURL}/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response: any) => (response.results as Pokemon[])
        )
      );
  }

  getPokemon(url: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(url);
  }

  getByGen(gen: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/generation/${gen}`);
  }

  getByType(type: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/type/${type}`);
  }

}
