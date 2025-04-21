require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

// สร้าง Bot ในโหมด polling (เหมาะกับรัน local หรือ test)
const bot = new TelegramBot(token, { polling: true });

const users = {}; // temporary user store

// กดเริ่ม
// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `👋 Welcome to *Fit Leveling*!\n\n` +
        `You’ve been chosen to walk the path of strength.\n` +
        `Every push-up, every drop of sweat brings you closer to your next level.\n\n` +
        `Are you ready to begin your daily quest and become the strongest version of yourself?`,
        {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [[
                    { text: "💥 Begin Your Fitness Quest", callback_data: 'start_quest' }
                ]]
            }
        }
    );
});


// Handle button press
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'start_quest') {
        bot.sendMessage(chatId, "Let's begin your journey. Tap the button below to build your Hunter Profile!", {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: "📋 Fill Your Profile",
                        web_app: {
                            url: "https://fit-leveling-36029.web.app/profile"
                        }
                    }
                ]]
            }
        });
    }
});



console.log("🚀 Bot is running and ready to receive messages!");