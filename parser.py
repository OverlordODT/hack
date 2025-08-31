import requests
from bs4 import BeautifulSoup
import re
import json
import os

# --- Тестовый парсер подарка ---
GIFT_URL = "https://t.me/nft/SignetRing-1"  # сюда можно подставлять любую ссылку

def save_to_market_json(item, filename="market.json"):
    data = []
    if os.path.exists(filename):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception:
            data = []
    data.append(item)
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def parse_gift_info(url):
    try:
        r = requests.get(url, timeout=7)
        if r.status_code != 200:
            print('Не удалось загрузить страницу')
            return None
        soup = BeautifulSoup(r.text, 'html.parser')
        # Название
        title = ''
        h1 = soup.find('h1')
        if h1:
            title = h1.text.strip()
        else:
            title_match = re.search(r'([\w\s]+Collectible #[0-9]+)', r.text)
            if title_match:
                title = title_match.group(1)
        # Фото
        img_url = ''
        img = soup.find('img')
        if img and img.get('src'):
            img_url = img['src']
        else:
            img_md = soup.find('td')
            if img_md:
                img_tag = img_md.find('img')
                if img_tag and img_tag.get('src'):
                    img_url = img_tag['src']
        # Таблица
        info = {}
        for row in soup.find_all('tr'):
            th = row.find('th')
            td = row.find('td')
            if th and td:
                key = th.text.strip()
                val = td.text.strip()
                info[key] = val
        result = {
            'title': title,
            'image': img_url,
            'model': info.get('Model', ''),
            'backdrop': info.get('Backdrop', ''),
            'symbol': info.get('Symbol', ''),
            'quantity': info.get('Quantity', ''),
        }
        print('Результат парсинга подарка:')
        for k, v in result.items():
            print(f"{k}: {v}")
        # Сохраняем результат в market.json
        save_to_market_json(result)
        return result
    except Exception as e:
        print('Ошибка парсинга:', e)
        return None

# --- Для теста ---
if __name__ == "__main__":
    parse_gift_info(GIFT_URL)
