import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const PORT = 1245;

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const getItembyId = (id) => {
    return listProducts.find(product => product.itemId === id);
};

const reserveStockbyId = (id, stock) => {
    return promisify(client.set).bind(client)(`item.${itemId}`, stock);
};

const getCurrentReservedStock = async (id) => {
    const getAsync = promisify(client.get).bind(client);
    const reservedStock = await getAsync(`item.${itemId}`);
    return parseInt(reservedStock) || 0;
};

const listProducts = [
    {
        itemId: 1,
        itemName: 'Suitcase 250',
        price: 50,
        initialAvailableQuantity: 4
    },
    {
        itemId: 2,
        itemName: 'Suitcase 450',
        price: 100,
        initialAvailableQuantity: 10
    },
    {
        itemId: 3,
        itemName: 'Suitcase 650',
        price: 350,
        initialAvailableQuantity: 2
    },
    {
        itemId: 4,
        itemName: 'Suitcase 1050',
        price: 550,
        initialAvailableQuantity: 5
    }
];

app.get('/list_products', (req, res) => {
    res.json(listProducts.map(product => ({
        itemId: product.itemId,
        itemName: product.itemName,
        price: product.price,
        initialAvailableQuantity: product.initialAvailableQuantity
    })));
});


app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItembyId(itemId);
    if (!product) {
        res.status(404).json({ status: 'Product not found' });
        return;
    }
    const reservedStock = await getCurrentReservedStock(itemId);
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
        res.json({ status: 'Product not found' });
        return;
    }
    const currentQuantity = product.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
    res.json({ ...product, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
        res.json({ status: 'Product not found' });
        return;
    }
    const currentQuantity = product.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
    if (currentQuantity <= 0) {
        res.json({ status: 'Not enough stock available', itemId });
        return;
    }
    await reserveStockById(itemId, currentQuantity - 1);
    res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});