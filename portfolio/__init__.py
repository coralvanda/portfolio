from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def front_page():
    return render_template("index.html")

@app.route("/test")
def test():
	return render_template("test-index.html")

@app.route("/kittyclicker")
def kitty_clicker():
	return render_template("catclicker.html")

if __name__ == "__main__":
    app.run()
