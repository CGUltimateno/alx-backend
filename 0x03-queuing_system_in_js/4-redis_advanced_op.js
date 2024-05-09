import { createClient, print } from 'redis';

let client;
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
};

const storedHash = () => {
    const obj = {
        'Portland': 50,
        'Seattle': 80,
        'New York': 20,
        'Bogota': 20,
        'Cali': 40,
        'Paris': 2
    };


    connectToRedis()
        .on('warning', () => {})
        .on('ready', function ()  {
            Object.entries(obj).forEach((value) => {
                this.hset('HolbertonSchools', value[0], value[1], print);
            });
        });
};

const getHashSet = () => {
    connectToRedis()
        .on('warning', () => {})
        .on('ready', function () {
            this.hgetall('HolbertonSchools', (err, reply) => {
                console.log(reply);
            });
        });
}

storedHash();
getHashSet();