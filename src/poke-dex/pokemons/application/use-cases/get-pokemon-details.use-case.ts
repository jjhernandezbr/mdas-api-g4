import { PokemonFavsRepositoryInterface } from "../../domain/interfaces/pokemon-favs-repository.interface";
import { PokemonRepository } from "../../domain/interfaces/pokemon-repository.interface";
import { PokemonId, PokemonNumsFav } from "../../domain/value-objects";

class GetPokemonDetailsUseCase {
    private pokemonRepository: PokemonRepository;
    private pokemonFavRepository: PokemonFavsRepositoryInterface;

    constructor(pokemonRepository: PokemonRepository, pokemonFavsRepository: PokemonFavsRepositoryInterface) {
        this.pokemonRepository = pokemonRepository;
        this.pokemonFavRepository = pokemonFavsRepository;
    }

    async execute(pokemon_id: number) {
        const pokemon = await this.pokemonRepository.getPokemonById(new PokemonId(pokemon_id));
        const favoriteNum = this.pokemonFavRepository.findPokemonById(pokemon.getId());
        pokemon.setFavouriteNums(new PokemonNumsFav(favoriteNum));
        return await pokemon;
    }
}

export default GetPokemonDetailsUseCase;
