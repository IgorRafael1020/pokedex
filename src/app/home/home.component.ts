import { Component } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  quantidadePokemon: number = 0;
  limitPokemon: number = 5;
  offsetPokemon: number = 0;

  listaPokemon: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ){
    this.listarPokemons();
    //this.listarPokemonsPaginado();
  }

  listarPokemons(){
    //this.pokemonService.getNationalDex().subscribe(pokedex => this.quantidadePokemon = pokedex.pokemon_entries.length);
    //this.pokemonService.getNationalDex().subscribe(pokemons => this.listaPokemon = pokemons);
    this.pokemonService.getNationalDex().subscribe(
      {
        next: (pokemons) => {
          this.listaPokemon = pokemons;
          console.log(this.listaPokemon);
        },
        error: (erro: any) => {
          console.log(erro);
        },
        complete: () => {}
      });
  }
  
  listarPokemonsPaginado(){
    /*this.pokemonService.getPokemonsPagination(this.offsetPokemon, this.limitPokemon)
      .subscribe
      ({
        next: (pokemons) => {
          this.listaPokemon = pokemons;
          console.log(this.listaPokemon);
        },
        error: (erro: any) => {
          console.log(erro);
        },
        complete: () => {}
      });*/
    
    /*this.pokemonService.getPokemonsPagination(this.offsetPokemon, this.limitPokemon).
      subscribe(pokemons => pokemons.map(pokemon => this.pokemonService.getPokemon(pokemon.url).subscribe(p => this.listaPokemon.push(p))));
    console.log(this.listaPokemon);*/

    this.pokemonService.getPokemonsPagination(this.offsetPokemon, this.limitPokemon)
      .subscribe
      ({
        next: (pokemons) => {
          this.listaPokemon = pokemons;
          console.log(this.listaPokemon);
        },
        error: (erro: any) => {
          console.log(erro);
        },
        complete: () => {}
      });
  }
}
