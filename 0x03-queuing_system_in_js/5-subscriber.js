/**
 *  Subscribe to a channel and log
 *  the messages to the console
 */
import { createClient } from 'redis';

const client = createClient();

client.on('message', (channel, message) => {
  console.log(`Message: ${message} on channel: ${channel}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.subscribe('holberton school channel');

client.on('message' , (channel, message) => {
    if (msg === 'KILL_SERVER') {
        console.log(msg);
        client.unsubscribe('holberton school channel');
    } else {
        console.log(`Channel ${channel} received message ${msg}`);
    }
});