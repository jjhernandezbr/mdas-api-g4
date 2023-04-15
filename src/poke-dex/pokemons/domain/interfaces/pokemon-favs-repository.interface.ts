
import { PokemonId } from "../value-objects";


export interface PokemonFavsRepositoryInterface {
  sumFavouritePokemon(pokemonId: PokemonId): void;
  findPokemonById(pokemonId: PokemonId): number;
}