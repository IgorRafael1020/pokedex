import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon';
import { Status } from '../models/status';

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
                let pokemon: Pokemon = {
                  id: entry.entry_number,
                  name: entry.pokemon_species.name
                }
                return pokemon;
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

  getPokemon(id: number): Observable<Pokemon>{
    return this.http.get(`${this.pokemonURL}/pokemon/${id}`)
      .pipe(
        map((response: any) => {
          let pokemon: Pokemon = {
            id: response.id,
            name: response.name,
            height: response.height,
            weight: response.weight,
            sprite: response.sprites.other["official-artwork"].front_default,
            type1: response.types[0].type.name,
            type2: response.types[1]?.type?.name ?? null
          };

          let status: Status = {
            hp: response.stats[0].base_stat,
            attack: response.stats[1].base_stat,
            defense: response.stats[2].base_stat,
            specialAttack: response.stats[3].base_stat,
            specialDefense: response.stats[4].base_stat,
            speed: response.stats[5].base_stat
          }

          pokemon.status = status;

          return pokemon;
        })
      );
  }

  getByGen(gen: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/generation/${gen}`);
  }

  getByType(type: number): Observable<[]>{
    return this.http.get<[]>(`${this.pokemonURL}/type/${type}`);
  }

}
