import RabbitMqEventSubscriber from "./rabbitMqEventSubscriber";

export function registerSubscriber() {
    const SUBSCRIBERS = [new RabbitMqEventSubscriber]

    SUBSCRIBERS.forEach(subscriber => subscriber.connect());
}