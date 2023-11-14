import requests
import sqlite3
import os

url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

url_modifier = "?&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date&sort=new"
#url_modifier = "?"

cards = requests.get(url + url_modifier)

cards_json = cards.json()['data']

connection = sqlite3.connect("database.sqlite")

cursor = connection.cursor()

cursor.execute("DROP TABLE IF EXISTS card")
cursor.execute("""CREATE TABLE IF NOT EXISTS card (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                type TEXT, 
                frameType TEXT, 
                desc TEXT, 
                atk INTEGER, 
                def INTEGER, 
                level INTEGER, 
                race TEXT,
                attribute TEXT)""")

for card in cards_json:
    if card.get('atk') is None:
        card['atk'] = -1

    if card.get('def') is None:
        card['def'] = -1

    if card.get('level') is None:
        card['level'] = -1

    if card.get('attribute') is None:
        card['attribute'] = ""

    cursor.execute("INSERT INTO card VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   [card['id'], card['name'], card['type'], card['frameType'],
                    card['desc'], card['atk'], card['def'], card['level'],
                    card['race'], card['attribute']])

    index = 0
    for image in card['card_images']:
        filename = "./res/images/cards/faces/" + card['name'] + '/' + str(index) + ".jpg"

        if (os.path.exists(filename)):
            continue
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        url = image['image_url']
        response = requests.get(url)
        with open(filename, "wb") as f:
            f.write(response.content)
        index += 1

    print('added ' + card['name'] + ' to database')

connection.commit()
