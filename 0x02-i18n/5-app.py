#!/usr/bin/env python3
"""
A Basic Flask app
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config:
    """Config class"""
    LANG = ["en", "fr"]
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
    """Get locale"""
    locale = get_user()
    if locale and locale['locale'] in Config.LANG:
        return locale['locale']
    return request.accept_languages.best_match(Config.LANG)


@app.route('/')
def hello_world() -> str:
    """Home page"""
    return render_template('5-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
