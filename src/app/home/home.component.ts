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
  
  offsetPokemon: number = 0;
  limitPokemon: number = 12;
  pagina: number = 1;

  listaPokemon: Pokemon[] = [];

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
                pokemons.splice(this.offsetPokemon, this.limitPokemon, ...detalhePokemons);
                this.listaPokemon = pokemons;
                console.log(this.listaPokemon);
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
    pokemons = pokemons.slice(this.offsetPokemon, this.offsetPokemon + this.limitPokemon);
    
    const observables = pokemons.map((pokemon) => this.pokemonService.getPokemon(pokemon.id));

    return forkJoin(observables);
  }

  mudarPagina(pagina: number){
    this.pagina = pagina;
    this.offsetPokemon = this.limitPokemon * (pagina-1);
    this.buscarDetalhePokemon(this.listaPokemon).subscribe(
      {
        next: (detalhePokemons) => {
          this.listaPokemon.splice(this.offsetPokemon, this.limitPokemon, ...detalhePokemons);
          console.log(this.listaPokemon);
        },
        error: (erro: any) => {
          console.log(erro);
        },
        complete: () => {}
      })
  }
}
