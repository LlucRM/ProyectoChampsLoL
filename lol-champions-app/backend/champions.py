import requests

DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'
CHAMPION_DETAIL_URL = 'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion/{}.json'

def get_all_champions():
    res = requests.get(DATA_DRAGON_URL)
    data = res.json()
    return list(data["data"].values())
def get_champion_by_id(champ_id):
    try:
        res = requests.get(CHAMPION_DETAIL_URL.format(champ_id))
        data  = res.json()
        return data["data"][champ_id]
    except:
        return None