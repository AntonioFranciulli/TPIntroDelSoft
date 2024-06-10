from flask import Flask,render_template,redirect,url_for,request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("feed.html")

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

def data_return(tipo):
    if tipo == "voluntario":
        return (request.form.get("fnombre_voluntario"),
                request.form.get("fpuesto_voluntario"),
                request.form.get("ftelefono_voluntario"),
                request.form.get("fcuil_voluntario"),
                request.form.get("ffoto_voluntario"),
                )
    elif tipo == "refugio":
        return (request.form.get("fnombre_refugio"),
                request.form.get("fdireccion_refugio"),
                request.form.get("fdescripcion_refugio"),
                request.form.get("ftipo_refugio"),
                request.form.get("ftelefono_refugio"),
                request.form.get("fusuario_refugio"), #TODO: USUARIO NO ESTÁ IMPLEMENTADO AUN
                request.form.get("fimagen_refugio"))



@app.route("/voluntario_cargado", methods = ["GET","POST"])
def cargar_voluntario():
    if request.method == "POST":
        nombre, puesto, telefono, cuil, foto = data_return("voluntario")
        return redirect(url_for("feed"))
    return render_template("cargar_voluntario.html")


@app.route("/edicion_refugio",methods = ["GET","POST"])
def edicion_refugio():
    if request.method == "POST":
        nombre, direccion, descripcion, tipo, telefono, usuario, foto = data_return("refugio")
        return render_template("detalles_refugio.html")
    return render_template("editar_refugio.html")

@app.route("/edicion_voluntario", methods = ["GET","POST"])
def edicion_voluntario():
    if request.method == "POST":
        nombre, puesto, telefono, cuil, foto = data_return("voluntario")
        return render_template("detalles_voluntario.html")
    return render_template("editar_voluntario.html")

@app.route("/detalles_voluntario")
def detalles_voluntario():
    return render_template("detalles_voluntario.html")

@app.route("/detalles_refugio")
def detalles_refugio():
    return render_template("detalles_refugio.html")

@app.route("/feed")
def feed():
    return render_template("feed.html")

@app.route("/cargar_refugio", methods = ["GET","POST"])
def cargar_refugio():
    return render_template("cargar_refugio.html")

@app.route("/mapa")
def mapa():
    # TO DO: Aca iria una llamada a la API para leer todos los refugios de la base de datos,
    # convertirlos a geojson y pasarle ese geojson a el mapa, de momento ese geojson esta hardcodeado.
    return render_template("mapa.html")


if __name__ == '__main__': 
   app.run(host='127.0.0.1', port=8080)