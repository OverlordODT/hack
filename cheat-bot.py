import asyncio
import sqlite3
import os
from datetime import datetime
from telethon import TelegramClient, events, Button
from telethon.errors import ChannelPrivateError, UserNotParticipantError
import config

# Инициализация клиента
client = TelegramClient('cheat_bot_session', config.API_ID, config.API_HASH)

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('subscriptions.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT,
        first_name TEXT,
        subscribed_tgk INTEGER DEFAULT 0,
        subscribed_chat INTEGER DEFAULT 0,
        subscribed_bio INTEGER DEFAULT 0,
        last_check TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

init_db()

# Функция для получения клавиатуры
def get_subscription_keyboard():
    return [
        [Button.url("📢 Подпишитесь на ТГК", config.CHANNEL_LINKS['tgk'])],
        [Button.url("💬 Зайдите в чат", config.CHANNEL_LINKS['chat'])], 
        [Button.url("⭐ Подпишитесь на BIO", config.CHANNEL_LINKS['bio'])],
        [Button.inline("✅ ПРОВЕРИТЬ ПОДПИСКУ", b"check_subscription")]
    ]

# Команда /start
@client.on(events.NewMessage(pattern='/start'))
async def start_handler(event):
    user = await event.get_sender()
    
    conn = sqlite3.connect('subscriptions.db')
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR IGNORE INTO users (user_id, username, first_name) VALUES (?, ?, ?)",
        (user.id, user.username, user.first_name)
    )
    conn.commit()
    conn.close()
    
    welcome_text = (
        "👋 Добро пожаловать в KitRit₸Hack!\n\n"
        "Чтобы получить доступ к читу, подпишитесь на все наши каналы:\n\n"
        "📢 @kitrite - Основной канал\n"
        "💬 @kitritchat - Чат сообщества\n" 
        "⭐ @kitritpidor - BIO канал\n\n"
        "После подписки нажмите кнопку 'ПРОВЕРИТЬ ПОДПИСКУ'\n\n"
        "❓ Если есть проблемы - используйте /debug"
    )
    
    await event.reply(
        welcome_text,
        buttons=get_subscription_keyboard()
    )

# Проверка подписки пользователя
async def check_user_subscription(user_id):
    try:
        results = {}
        
        for channel_name, channel_link in config.CHANNEL_LINKS.items():
            try:
                entity = await client.get_entity(channel_link)
                
                try:
                    participant = await client.get_permissions(entity, user_id)
                    results[channel_name] = participant is not None
                    
                except (ChannelPrivateError, UserNotParticipantError):
                    results[channel_name] = False
                    
            except Exception as e:
                print(f"Ошибка проверки {channel_name}: {e}")
                results[channel_name] = False
        
        conn = sqlite3.connect('subscriptions.db')
        cursor = conn.cursor()
        
        for channel_name, is_subscribed in results.items():
            cursor.execute(
                f"UPDATE users SET subscribed_{channel_name} = ? WHERE user_id = ?",
                (1 if is_subscribed else 0, user_id)
            )
        
        conn.commit()
        conn.close()
        
        return all(results.values())
        
    except Exception as e:
        print(f"Ошибка проверки подписки: {e}")
        return False

# Функция для отправки файлов
async def send_cheat_files(user_id):
    try:
        # Сначала отправляем файл чита
        await client.send_file(
            user_id,
            'KitRit-Premium-Version-0.5.0.1.lua',
            caption=(
                "🎉 Поздравляем! Вы получили доступ к читу!\n\n"
                "⚠️ **ВАЖНО:**\n"
                "• Данный чит будет работать 48 часов\n"
                "• После потребуется скачать его заново\n"
                "• Вы можете купить полную версию без слета и с дополнительными функциями:\n"
                "  💵 За 1$ через @send\n"
                "  ⭐️ За 50 звезд тг"
            )
        )
        
        # Ждем немного перед отправкой гайда
        await asyncio.sleep(1)
        
        # Отправляем видео гайд
        await client.send_file(
            user_id,
            'video.mp4',
            caption="📹 **Гайд по установке:**"
        )
        
        # Отправляем APK файлы
        apk_files = ['app1.apk', 'app2.apk']
        for apk_file in apk_files:
            if os.path.exists(apk_file):
                await client.send_file(user_id, apk_file)
                await asyncio.sleep(0.5)
        
        return True
        
    except Exception as e:
        print(f"Ошибка отправки файлов: {e}")
        return False

# Обработчик кнопок
@client.on(events.CallbackQuery)
async def button_handler(event):
    if event.data == b"check_subscription":
        await event.answer("🔍 Проверяем подписки...")
        
        user_id = event.sender_id
        is_subscribed = await check_user_subscription(user_id)
        
        if is_subscribed:
            await event.edit(
                "✅ Отлично! Вы подписаны на все каналы!\n"
                "📦 Отправляем файлы...",
                buttons=None
            )
            
            # Отправляем файлы
            success = await send_cheat_files(user_id)
            
            if not success:
                await event.respond(
                    "❌ Не удалось отправить файлы. Попробуйте позже.",
                    buttons=get_subscription_keyboard()
                )
            
        else:
            await event.edit(
                "❌ Вы не подписаны на все каналы!",
                buttons=get_subscription_keyboard()
            )

# Запуск бота
async def main():
    print("🚀 Запуск бота...")
    
    # Проверяем наличие файлов
    if not os.path.exists('KitRit-Premium-Version-0.5.0.1.lua'):
        print("❌ Файл чита не найден!")
        return
    
    if not os.path.exists('video.mp4'):
        print("⚠️ Видео гайд не найден")
    
    # Проверяем APK файлы
    apk_files = ['app1.apk', 'app2.apk']
    apk_found = False
    for apk_file in apk_files:
        if os.path.exists(apk_file):
            apk_found = True
            print(f"✅ Найден APK файл: {apk_file}")
    
    if not apk_found:
        print("⚠️ APK файлы не найдены")
    
    # Подключаемся к API
    await client.start(bot_token=config.BOT_TOKEN)
    print("✅ Бот подключен к Telegram API")
    
    print("🤖 Бот запущен и готов к работе!")
    
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
