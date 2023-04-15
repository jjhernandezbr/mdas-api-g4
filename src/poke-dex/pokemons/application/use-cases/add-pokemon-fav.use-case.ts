import { PokemonFavsRepositoryInterface } from "../../domain/interfaces/pokemon-favs-repository.interface";
import { PokemonId } from "../../domain/value-objects";

class AddPokemonFavUseCase {
    private pokemonFavsRepository: PokemonFavsRepositoryInterface;
    constructor(pokemonFavsRepository: PokemonFavsRepositoryInterface) {
        this.pokemonFavsRepository = pokemonFavsRepository;
    }

    execute(pokemon_id: number) {
        this.pokemonFavsRepository.sumFavouritePokemon(new PokemonId(pokemon_id));
    }
}

export default AddPokemonFavUseCase;