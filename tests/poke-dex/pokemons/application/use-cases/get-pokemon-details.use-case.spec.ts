import PokemonAggregate from "../../../../../src/poke-dex/pokemons/domain/pokemon.aggregate";
import {
  PokemonHeight,
  PokemonId,
  PokemonName, PokemonTypeName, PokemonTypeUrl,
  PokemonWeight
} from "../../../../../src/poke-dex/pokemons/domain/value-objects";
import GetPokemonDetails
  from "../../../../../src/poke-dex/pokemons/application/use-cases/get-pokemon-details.use-case";
import PokemonType from "../../../../../src/poke-dex/pokemons/domain/entities/pokemon-type.entity";

const pokemonType = new PokemonType(
  new PokemonTypeName("Electric"),
  new PokemonTypeUrl("https://valid-url.com"),
);
const pokemon = new PokemonAggregate(
  new PokemonId(1),
  new PokemonName("Pikachu"),
  [pokemonType],
  new PokemonHeight(20),
  new PokemonWeight(20),
);

const mockPokemonRepository = {
  getPokemonByName: jest.fn().mockReturnValue(pokemon), //
  getPokemonById: jest.fn().mockReturnValue(pokemon) //
}

const mockPokemonFavsRepository = {
  sumFavouritePokemon: jest.fn(),
  findPokemonById: jest.fn()
}

describe('GetPokemonDetails', () => {
  it('should be defined', () => {
    expect(GetPokemonDetails).toBeDefined();
  });

  it('should be executed', async () => {
    const useCase = new GetPokemonDetails(mockPokemonRepository, mockPokemonFavsRepository);
    expect(await useCase.execute(1)).toBe(pokemon);
    expect(mockPokemonRepository.getPokemonById).toBeCalledTimes(1);
  });
});
