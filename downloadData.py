import requests
import sqlite3

url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

url_modifier = "?&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date&sort=new"

cards = requests.get(url + url_modifier)

cards_json = cards.json()['data']

connection = sqlite3.connect("database.sqlite")

cursor = connection.cursor()


cursor.execute("""CREATE TABLE IF NOT EXISTS card (name TEXT, type TEXT, frameType TEXT, 
                desc TEXT, atk NUMBER, def NUMBER, level NUMBER, race TEXT,
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

    cursor.execute("INSERT INTO card VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   [card['name'], card['type'], card['frameType'], card['desc'],
                    card['atk'], card['def'], card['level'], card['race'],
                    card['attribute']])

    for image in card['card_images']:
        url = image['image_url']
        response = requests.get(url)
        with open("res/images/cards/faces/" + str(image['id']) +".jpg", "wb") as f:
            f.write(response.content)

    print('added ' + card['name'] + ' to database')
