# Techzara WCC 2nd Edition, week 1
This app allow github users to get a list of github users by country and search a specific
user by its username.

## Getting Started
You have the choice between using the app with authentication or not.
When authenticated, you are allowed to make up to 30 requests per minutes against 10 when you're not authenticated.
The authentication is done your your github account.

⚠️ The dropdown with the country list may take a while to load depending on your internet connection.
##  Prerequisites
You need to have python 3 installed on your machine in order to run the backend and npm for the frontend.
### Backend
- Install the necessary python packages (preferably in a virtual environment):
```sh
cd backend/
pip3 install -r requirements.txt
```
### Frontend
- Install the necessary node modules :
```sh
cd frontend/
npm install # or npm i
```
## How to run
Go to the `backend` directory and type :
```sh
python app.py
```
Then to the `frontend` directory and type :
```sh
npm start
```
A new tab will be open with your default browser where you can use the app.
# Authors
* [tbgracy](https://github.com/tbgracy)

* [rhja](https://github.com/radoheritiana)