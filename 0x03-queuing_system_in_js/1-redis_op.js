import { createClient, print } from 'redis';

let client = undefined;

/**
 * Add two functions:
 *
 * setNewSchool:
 * It accepts two arguments schoolName, and value.
 * It should set in Redis the value for the key schoolName
 * It should display a confirmation message using redis.print
 * displaySchoolValue:
 * It accepts one argument schoolName.
 * It should log to the console the value for the key passed as argument
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

const setNewSchool = (schoolName, value) => {
    client = connectToRedis();
    client.set(schoolName, value, print);
}

const displaySchoolValue = (schoolName) => {
    client = connectToRedis();
    client.get(schoolName, (err, reply) => {
        console.log(reply);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
