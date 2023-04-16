import { UserRepositoryInterface } from "../../domain/interfaces/user-repository.interface";
import { UserId } from "../../domain/value-objects";
import { PokemonId } from "../../../pokemons/domain/value-objects";
import { EventPublisher } from "../../domain/interfaces/eventPublisher.interface";

class AddPokemonToUserFavouritesUseCase {
  private repository: UserRepositoryInterface;
  private publisher: EventPublisher;

  constructor(repository: UserRepositoryInterface, publisher: EventPublisher) {
    this.repository = repository;
    this.publisher = publisher;
  }

  execute(userId: number, pokemonId: number): void {
    const userUpdated = this.repository.addFavouritePokemon(new UserId(userId), new PokemonId(pokemonId));
    this.publisher.publish(userUpdated.pullDomainEvent());
  }
}

export default AddPokemonToUserFavouritesUseCase;
