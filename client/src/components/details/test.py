import requests

print(requests.post('https://minecraft.buzz/processing/reviews_show_more.php?server_id=3387', {"limit": "0"}).text)