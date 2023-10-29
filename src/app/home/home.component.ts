import { Component } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  quantidadePokemon: number = 0;
  
  offsetPokemon: number = 251;
  limitPokemon: number = 260;

  listaPokemon: Pokemon[] = [];
  listaDetalhePokemon: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ){
    this.listarPokemons();
  }

  listarPokemons(){
    this.pokemonService.getNationalDex().subscribe(
      {
        next: (pokemons) => {
          this.buscarDetalhePokemon(pokemons).subscribe(
            {
              next: (detalhePokemons) => {
                this.listaPokemon = pokemons;
                this.listaDetalhePokemon = detalhePokemons;
                console.log(this.listaPokemon);
                console.log(this.listaDetalhePokemon);
              },
              error: (erro: any) => {
                console.log(erro);
              },
              complete: () => {}
            })
        },
        error: (erro: any) => {
          console.log(erro);
        },
        complete: () => {}
      });
  }

  buscarDetalhePokemon(pokemons: Pokemon[]): Observable<Pokemon[]>{
    pokemons = pokemons.slice(this.offsetPokemon, this.limitPokemon);
    
    const observables = pokemons.map((pokemon) => this.pokemonService.getPokemon(pokemon.id));

    return forkJoin(observables);
  }
}
