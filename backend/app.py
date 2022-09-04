from flask import Flask, jsonify, request, redirect, abort
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv
from os import environ


load_dotenv()

app = Flask(__name__)

CORS(app)

USER_PER_PAGE = 10

HOME_PAGE = 'http://127.0.0.1:3000/search'


@app.after_request
def after_request(response):
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, OPTIONS"
    )
    return response


@app.route('/token')
def get_token():
    code = request.args.get("code", None)
    if code == None:
        abort(400, "the code needed to get the token was not provided")

    data = {
        "client_id": environ.get("CLIENT_ID", None),
        "client_secret": environ.get("CLIENT_SECRET", None),
        "code": code,
        "accept": "application/vnd.github+json"
    }
    if data['client_id'] == None or data['client_secret'] == None:
        abort(500, "couldn't access client id or secret")

    res = requests.post(
        "https://github.com/login/oauth/access_token",
        json=data,
        headers={"accept": "application/vnd.github+json"}
    )
    if res.status_code == 200:
        res = json.loads(res.content)
        try:
            token = res['access_token']
            return jsonify({"token": res['access_token']})
        except:
            return jsonify(res)
    else:
        abort(res.status_code, res.content)


@app.route('/users')
def get_users():
    base_url = "https://api.github.com"

    auth_header = request.headers.get("Authorization", None)
    country = request.args.get("country", None)
    page = request.args.get("page", None)
    username = request.args.get("name", None)

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": auth_header
    }

    if username is not None:
        url = f'{base_url}/search/users?q={username}+in:login+location:{country}&sort=joined&per_page={USER_PER_PAGE}&page={page}'
    else:
        url = f'{base_url}/search/users?q=location:{country}&sort=joined&per_page={USER_PER_PAGE}&page={page}'

    try:
        res = requests.get(url=url, headers=headers)
    except:
        abort(500, "unable to prc")

    res = json.loads(res.content)

    total_count = res.get('total_count', None)

    total_pages = int(calculate_total_page(total_count, USER_PER_PAGE))

    results = {
        "total_count": total_count,
        "total_page": total_pages,
        "users": [
            {
                "username": user['login'],
                "joined_date": None,
                # "joined_date": get_joined_date(user['url'], headers),
                "profil_link": user['html_url'],
                "avatar_url": user['avatar_url'],
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


@app.errorhandler(400)
def bad_request(error):
    return jsonify({"status code": 400, "messages": error.description})

@app.errorhandler(500)
def server_error(error):
    return jsonify({"status code": 500, "messages": error.description})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
