from flask import Flask,render_template,redirect,url_for,request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("base.html")

@app.errorhandler(400)
def bad_request(e):
    return render_template("400.html"), 400

@app.errorhandler(403)
def forbidden_error(e):
    return render_template("403.html"), 403



@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template("500.html") , 500



@app.route("/about_us")
def about_us():
    return render_template("about_us.html")



@app.route("/detalles_voluntario")
def voluntarios():
    return render_template("detalles_voluntario.html")






@app.route("/voluntario_cargado", methods = ["GET","POST"])
def cargar_voluntario():
    if request.method == "POST":
        nombre = request.form.get("fnombre_voluntario")
        puesto = request.form.get("fpuesto_voluntario")
        telefono = request.form.get("ftelefono_voluntario")
        cuil = request.form.get("fcuil_voluntario")
        foto = request.form.get("ffoto_voluntario")
        return redirect(url_for("confirmar_voluntario"))
    return render_template("cargar_voluntario.html")

@app.route("/voluntario_confirmado")
def confirmar_voluntario():
    return render_template("confirmacion_voluntario.html")



if __name__ == "__main__":
    app.run("127.0.0.1",port = "8080", debug = True)
