import { Component } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listaPokemon: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ){
    this.listarPokemons();
  }

  listarPokemons(){
    this.pokemonService.getAll().subscribe(pokedex => pokedex.pokemon_entries.map(p => this.listaPokemon.push(p.pokemon_species)));
    console.log(this.listaPokemon);
  }
}
