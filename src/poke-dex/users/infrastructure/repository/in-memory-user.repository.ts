import { UserRepositoryInterface } from "../../domain/interfaces/user-repository.interface";
import UserAggregate from "../../domain/user.aggregate";
import { UserId } from "../../domain/value-objects";
import { PokemonId } from "../../../pokemons/domain/value-objects";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { app } from "../../../app";

class InMemoryUserRepository implements UserRepositoryInterface {
  private users: UserAggregate[] = app.locals.users;

  save(user: UserAggregate): void {
    this.users.push(user);
  }

  addFavouritePokemon(userId: UserId, pokemonId: PokemonId): UserAggregate {
    const user = this.users.find((user) => user.getId().value === userId.value);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.addFavouritePokemon(pokemonId);
    return user;
  }

  findUserById(userId: UserId): UserAggregate | undefined {
    return this.users.find((user) => user.getId().value === userId.value);
  }
}

export default InMemoryUserRepository;
