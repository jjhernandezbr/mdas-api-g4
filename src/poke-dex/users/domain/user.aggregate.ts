import { UserPokemonAlreadyInFavouritesException } from "./exceptions/user-pokemon-already-in-favourites.exception";
import { UserId, UserName } from "./value-objects";
import { PokemonId } from "../../pokemons/domain/value-objects";
import FavouritePokemonAdded from "./events/favouritePokemonAdded.domainEvent";

class UserAggregate {
  private id: UserId;
  private name: UserName;
  private favouritePokemonIds: number[];
  private events: FavouritePokemonAdded[] = [];

  constructor(id: UserId, name: UserName, favouritePokemonIds: number[] = []) {
    this.id = id;
    this.name = name;
    this.favouritePokemonIds = favouritePokemonIds;
  }

  public getId(): UserId {
    return this.id;
  }

  public getFavouritePokemons(): number[] {
    return this.favouritePokemonIds;
  }

  public addFavouritePokemon(pokemonId: PokemonId): void {
    this.validatePokemonIsAlreadyFavourite(pokemonId);
    this.favouritePokemonIds.push(pokemonId.value);
    const pokemonAdded = new FavouritePokemonAdded(pokemonId.value);
    this.raise(pokemonAdded);
  }

  public pullDomainEvent(): FavouritePokemonAdded[] {
    const events = this.events;
    this.events = [];
    return events;
  }

  private raise(event: FavouritePokemonAdded) {
    this.events.push(event);
  }

  private validatePokemonIsAlreadyFavourite(pokemonId: PokemonId) {
    if (this.favouritePokemonIds.includes(pokemonId.value)) {
      throw new UserPokemonAlreadyInFavouritesException();
    }
  }
}

export default UserAggregate;
