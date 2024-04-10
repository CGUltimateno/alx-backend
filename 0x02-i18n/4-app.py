#!/usr/bin/env python3
"""
A Basic Flask app
"""
from flask import Flask, render_template, request
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


@babel.localeselector
def get_locale() -> str:
    """Get locale"""
    query = request.query_string.decode('utf-8').split('&')
    query_table = dict(map(
        lambda x: (x if '=' in x else '{}='.format(x)).split('='),
        query,
    ))
    if 'locale' in query_table and query_table['locale'] in Config.LANG:
        return query_table['locale']
    return request.accept_languages.best_match(Config.LANG)


@app.route('/')
def hello_world() -> str:
    """Home page"""
    return render_template('4-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
