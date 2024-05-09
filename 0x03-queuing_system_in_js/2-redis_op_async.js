import { createClient, print } from 'redis';
const { promisify } = require('util');

let client = undefined;
/**
 * Make a connection to a reds server
 * on local port 6379. Logs
 * a message when connected.
 */

const connectToRedis = () => {
    if (client) return (client);

    client = createClient();

    client.on('connect', () => {
        console.log('Connected to Redis server');
    });
    client.on('error', (err) => {
        console.log(`Error: ${err}`);
    });

    return (client);
}

/**
 * Set a new key value pair in redis
 * @param {string} key
    * @param {string} value
    */
const setNewSchool = async (key, value) => {
    const set = promisify(connectToRedis().set).bind(connectToRedis());

    console.log(`Reply: ${await set(key, value)}`);
}

/**
 * Get the value of a key in redis
 * @param {string} key
 */

const displaySchoolValue = async (key) => {
    const get = promisify(connectToRedis().get).bind(connectToRedis());

    console.log(await get(key));
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');