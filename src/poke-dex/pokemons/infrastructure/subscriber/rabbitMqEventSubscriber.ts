
import amqp from 'amqplib/callback_api';
import { favouritePokemonAddedEvent } from '../../../users/domain/interfaces/favouritePokemonAddedEvent.interface';
import AddPokemonFavUseCase from '../../application/use-cases/add-pokemon-fav.use-case';
import { Subscriber } from '../../domain/interfaces/subscriberDomainEvent.interface';
import InMemoryPokemonFavsRepository from '../repositories/in-memory.pokemon-favs.repository';


class RabbitMqEventSubscriber implements Subscriber {


  connect() {
    const options = {
      clientProperties:
      {
        connection_name: 'producer-service'
      }
    };
    amqp.connect('amqp://rabbitmquser:rabbitmqpassword@localhost', options, (error, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((connErr, channel) => {
        if (connErr) {
          throw connErr;
        }

        channel.assertQueue('test_queue', { durable: true });

        channel.prefetch(1);

        channel.consume('test_queue', (msg) => {
          if (msg !== null)
            this.on(JSON.parse(msg.content.toString()));
        }, {
          noAck: true
        });
      });
    });

  }

  on(event: favouritePokemonAddedEvent): void {
    const addPokemonFavUseCase = new AddPokemonFavUseCase(new InMemoryPokemonFavsRepository());
    addPokemonFavUseCase.execute(event.pokemonId);
  }
}

export default RabbitMqEventSubscriber;




