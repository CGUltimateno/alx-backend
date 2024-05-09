/**
 *  Publish a message to a channel
 */
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

const publishMessage = (msg, time) => {
    setTimeout(() => {
        console.log(`About to send ${message}`);
        client.publish('holberton school channel', message);
    }, time);
};

publishMessage('Holberton School', 100);
publishMessage('Holberton', 200);
publishMessage("KILL_SERVER", 300)
publishMessage('Holberton School', 400);