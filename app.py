from flask import Flask,render_template,redirect,url_for,request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("base.html")

@app.route("/prueba")
def prueba():
    return render_template("prueba.html")



if __name__ == "__main__":
    app.run("127.0.0.1",port = "8080", debug = True)
