import { createClient } from 'redis';

/**
 * Using Babel and ES6, write a script named 0-redis_client.js.
 * It should connect to the Redis server running on your machine
 */
const connectToRedis = () => {
    const client = createClient();
    client.on('connect', () => {
        console.log('Connected to Redis server');
    });
    client.on('error', (err) => {
        console.log(`Error: ${err}`);
    });
}

connectToRedis();