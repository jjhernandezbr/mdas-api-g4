import { app } from "../../../app";
import { PokemonFavsRepositoryInterface } from "../../domain/interfaces/pokemon-favs-repository.interface";
import { PokemonId } from "../../domain/value-objects";

class InMemoryPokemonFavsRepository implements PokemonFavsRepositoryInterface {

  private pokemons: Map<number, number> = app.locals.favoritePokemon;

  sumFavouritePokemon(pokemonId: PokemonId): void {

    this.pokemons.set(pokemonId.value, this.findPokemonById(pokemonId) + 1);
  }
  findPokemonById(pokemonId: PokemonId): number {
    return this.pokemons.get(pokemonId.value) || 0;
  }
}

export default InMemoryPokemonFavsRepository;