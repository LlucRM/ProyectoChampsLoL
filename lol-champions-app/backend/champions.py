import requests

DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'

def get_all_champions():
    res = requests.get(DATA_DRAGON_URL)
    data = res.json()
    return list(data["data"].values())

def get_champion_by_id(champ_id, language='en_US'): 
    try:
        
        champion_detail_url = f'https://ddragon.leagueoflegends.com/cdn/14.7.1/data/{language}/champion/{champ_id}.json'
        
        
        res = requests.get(champion_detail_url)

        if res.status_code == 200:
            data = res.json()
            return data["data"].get(champ_id, None)  
        else:
            print(f"Error al obtener datos del campeón. Código de estado: {res.status_code}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None
