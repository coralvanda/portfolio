from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def front_page():
    return render_template("index.html")

@app.route("/neighborhoodMap")
def show_map():
	return render_template("/neighborhoodmap/index.html")

if __name__ == "__main__":
    app.run()