#!/usr/bin/env python3
"""
A Basic Flask app to get locale from request
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config:
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    """Get user"""
    try:
        return users.get(g.user)
    except Exception:
        return None


@app.before_request
def before_request():
    """Before request"""
    g.user = request.args.get('login_as')



@babel.localeselector
def get_locale() -> str:
    """Get locale for a web page"""
    locale = request.args.get('locale', '')
    if locale in Config.LANG:
        return locale
    user = get_user()
    if user and user['locale'] in Config.LANG:
        return user['locale']
    if request.accept_languages:
        return request.accept_languages.best_match(Config.LANG)
    return Config.BABEL_DEFAULT_LOCALE


@babel.timezoneselector
def get_timezone() -> str:
    """Get timezone for a web page"""
    timezone = request.args.get('timezone', '')
    if timezone:
        return timezone
    user = get_user()
    if user and user['timezone']:
        return user['timezone']
    return Config.BABEL_DEFAULT_TIMEZONE


@app.route('/')
def get_index() -> str:
    """Home page"""
    return render_template('7-index.html', user=g.user)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
