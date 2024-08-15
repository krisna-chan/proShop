import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/user.js';
import products from './data/products.js';
import User from './models/userModels.js';
import Product from './models/productModels.js';
import Order from './models/orderModels.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {
               ...product,
               user: adminUser,
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported and seeding completed!'.green.inverse) 
        process.exit();
    } catch (error) {
        console.error('Error during data import: ', error.message).red.bold;
        process.exit(1);
    }
}

const destroyData = async() => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data destroyed!'.green.inverse)
        process.exit();
    }
    catch (error){
        console.error('Error during data destroy: ', error.message).red.bold;
        process.exit(1);
    }
}

if (process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}