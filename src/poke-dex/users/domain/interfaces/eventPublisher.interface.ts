import { favouritePokemonAddedEvent } from "./favouritePokemonAddedEvent.interface";

export interface EventPublisher {
    publish(event: favouritePokemonAddedEvent[]): void;
}
