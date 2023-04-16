import { favouritePokemonAddedEvent } from "../interfaces/favouritePokemonAddedEvent.interface";


class FavouritePokemonAdded implements favouritePokemonAddedEvent {
    occurredAt: Date;
    pokemonId: number;

    constructor(pokemonId: number) {
        this.occurredAt = new Date();
        this.pokemonId = pokemonId;
    }
}
export default FavouritePokemonAdded;