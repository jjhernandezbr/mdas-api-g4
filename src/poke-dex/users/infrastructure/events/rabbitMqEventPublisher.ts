/* eslint-disable */
import amqp from 'amqplib/callback_api';
import { EventPublisher } from '../../domain/interfaces/eventPublisher.interface';
import { favouritePokemonAddedEvent } from '../../domain/interfaces/favouritePokemonAddedEvent.interface';


class RabbitMqEventPublisher implements EventPublisher {



  publish(events: favouritePokemonAddedEvent[]): void {

    const options = {
      clientProperties:
      {
        connection_name: 'producer-service'
      }
    };

    amqp.connect('amqp://rabbitmquser:rabbitmqpassword@localhost', options, (error: any, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((connErr, channel) => {
        if (connErr) {
          throw connErr;
        }

        events.forEach((event) => {
          channel.assertQueue('test_queue', {
            durable: true
          });
          channel.sendToQueue('test_queue', Buffer.from(JSON.stringify(event)), {
            persistent: true
          });
        });
      });

      setTimeout(function () {
        connection.close();
      }, 500);
    });
  }
}

export default RabbitMqEventPublisher;
