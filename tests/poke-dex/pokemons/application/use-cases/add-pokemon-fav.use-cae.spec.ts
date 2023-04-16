import AddPokemonFavUseCase from "../../../../../src/poke-dex/pokemons/application/use-cases/add-pokemon-fav.use-case";

const mockPokemonFavsRepository = {
    sumFavouritePokemon: jest.fn(),
    findPokemonById: jest.fn()
}
describe("execute", () => {
    it("should call the increment method of the pokemon favourite count repository", () => {
        const useCase = new AddPokemonFavUseCase(mockPokemonFavsRepository);

        useCase.execute(1);

        expect(mockPokemonFavsRepository.sumFavouritePokemon).toBeCalledTimes(1);
    });
});