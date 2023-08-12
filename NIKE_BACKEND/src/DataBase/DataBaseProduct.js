const { ObjectId } = require('mongodb');
const db = require('./db');
const getDB = require('./db');

const getAllProducts = async () => {
    return await getDB().products.find().toArray();
};

const getProduct = async (id) => {
    return await getDB().products.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllProducts,
    getProduct,
};