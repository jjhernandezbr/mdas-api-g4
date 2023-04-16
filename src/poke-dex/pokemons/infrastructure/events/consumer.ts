
import amqp from 'amqplib/callback_api';
import { on } from 'events';
import AddPokemonFavUseCase from '../../application/use-cases/add-pokemon-fav.use-case';

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
        console.log(msg.content.toString());
    }, {
      noAck: true
    });
  });
});