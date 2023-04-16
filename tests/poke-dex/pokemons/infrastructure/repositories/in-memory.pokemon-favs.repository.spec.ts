import { PokemonId } from "../../../../../src/poke-dex/pokemons/domain/value-objects";
import InMemoryPokemonFavsRepository from "../../../../../src/poke-dex/pokemons/infrastructure/repositories/in-memory.pokemon-favs.repository";



describe("Sum favourite count", () => {
    it("should increase the favourite count by 1", () => {
        const repository = new InMemoryPokemonFavsRepository();

        repository.sumFavouritePokemon(new PokemonId(1));

        expect(repository.findPokemonById(new PokemonId(1))).toBe(1);
    });
});