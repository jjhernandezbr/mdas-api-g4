import PokemonType from "./entities/pokemon-type.entity"
import { PokemonId, PokemonName, PokemonHeight, PokemonWeight, PokemonNumsFav } from "./value-objects";


class PokemonAggregate {
  private readonly id: PokemonId;
  private readonly name: PokemonName;
  private readonly types: PokemonType[];
  private readonly height: PokemonHeight;
  private readonly weight: PokemonWeight;
  private favouriteNums: PokemonNumsFav;

  constructor(id: PokemonId, name: PokemonName, types: PokemonType[], height: PokemonHeight, weight: PokemonWeight, pokemonNumsFav: PokemonNumsFav = new PokemonNumsFav(0)) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.height = height;
    this.weight = weight;
    this.favouriteNums = pokemonNumsFav;
  }

  public getId(): PokemonId {
    return this.id;
  }

  public getTypes(): PokemonType[] {
    return this.types;
  }

  public getName(): PokemonName {
    return this.name;
  }

  public getHeight(): PokemonHeight {
    return this.height;
  }

  public getWeight(): PokemonWeight {
    return this.weight;
  }

  public getFavouriteNums(): PokemonNumsFav {
    return this.favouriteNums;
  }

  public setFavouriteNums(pokemonFavsNum: PokemonNumsFav): void {
    this.favouriteNums = pokemonFavsNum;
  }

}

export default PokemonAggregate;
