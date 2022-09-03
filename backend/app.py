from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv
from os import environ


load_dotenv()

app = Flask(__name__)

CORS(app)

USER_PER_PAGE = 10

# HOME_PAGE = 'http://127.0.0.1:5000'
HOME_PAGE = 'http://127.0.0.1:3000/search'

@app.route('/')
def index():
    return "Hello"

@app.route('/token')
def get_token():
    code = request.args.get("code", None)
    # try
    data = {
        "client_id": environ.get("CLIENT_ID", None),
        "client_secret": environ.get("CLIENT_SECRET", None),
        "code": code,
        "accept": "application/vnd.github+json"
    }
    res = requests.post(
        "https://github.com/login/oauth/access_token",
        json=data,
        headers={"accept": "application/vnd.github+json"}
    )
    if res.status_code == 200:
        res = json.loads(res.content)
        print(res)
        return jsonify({"token": res['access_token']})
    else:
        return jsonify({"status_code": res.status_code})


@app.route('/search/<int:search_query>')
def search_user(user_id):
    pass


@app.route('/users')
def get_users():
    # TODO : Get user joining dates
    # TODO : Gestion d'erreur
    base_url = "https://api.github.com"

    auth_header = request.headers.get("Authorization", None)
    country = request.args.get("country", "france")
    page = request.args.get("page", 1)

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": auth_header
    }
    
    url = f'{base_url}/search/users?q=location:{country}&sort=joined&per_page={USER_PER_PAGE}&page={page}'
    
    try:
        res = requests.get(url=url, headers=headers)
    except:
        return jsonify({"message": "There was an error processing the request"})

    res = json.loads(res.content)

    total_count = res.get('total_count', None)

    total_pages = calculate_total_page(total_count, USER_PER_PAGE)

    results = {
        "total_count": total_count,
        "total_page": total_pages,
        "users": [
            {
                "username": user['login'],
                "joined_date": None,
                # "joined_date": get_joined_date(user['url'], headers),
                "profil_link": user['html_url'],
            } for user in res['items']
        ]
    }

    if total_pages > 100:
        results['message'] = "Only the 100 first pages are availables."

    return jsonify(results)


# Too inefficient
def get_joined_date(url, headers):
    res = requests.get(url, headers=headers)
    res = json.loads(res.content)
    return res['created_at']


def calculate_total_page(total_items, per_page):
    if total_items % per_page == 0:
        total = total_items / per_page
    else:
        total = (total_items // per_page) + 1
    return total


if __name__ == "__main__":
    app.run(debug=True, port=5000)
