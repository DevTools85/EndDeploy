const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Mongoose'u uyarılara hazırla
mongoose.set('strictQuery', false);

// Express uygulaması oluşturuluyor
const app = express();
const port = process.env.PORT || 3000;

// MongoDB bağlantısı
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.udbpvg9.mongodb.net/blog_admin`;

// MongoDB bağlantısını başlat
async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log('MongoDB\'ye başarıyla bağlanıldı');
        startServer();
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
    }
}

// Sunucuyu başlat
function startServer() {
    app.listen(port, () => {
        console.log(`Server ${port} portunda çalışıyor`);
    });

    // Express uygulaması
    app.get('/server', (req, res) => {
        res.json({ message: 'MongoDB\'ye başarıyla bağlanıldı' });
    });
}

// MongoDB bağlantısını başlat ve sunucuyu başlat
connectToDatabase();
