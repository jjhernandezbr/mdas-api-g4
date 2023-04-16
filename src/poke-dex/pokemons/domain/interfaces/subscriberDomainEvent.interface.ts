import { favouritePokemonAddedEvent } from "../../../users/domain/interfaces/favouritePokemonAddedEvent.interface"

export interface Subscriber {
    connect(): void
    on(event: favouritePokemonAddedEvent): void
}