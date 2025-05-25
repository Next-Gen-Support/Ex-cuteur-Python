from flask import Flask, render_template, request, jsonify
import io
import contextlib

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run", methods=["POST"])
def run_code():
    code = request.form.get("code")
    
    # Préparer un espace global pour l'exécution
    exec_globals = {}
    
    # Fonction simulée pour parler à une AI
    def talk_ai(msg):
        return "Réponse de l'AI : " + msg
    exec_globals['talk_ai'] = talk_ai

    redirected_output = io.StringIO()
    try:
        with contextlib.redirect_stdout(redirected_output):
            # ATTENTION : exec() exécute du code arbitraire. À utiliser prudemment.
            exec(code, exec_globals)
        output = redirected_output.getvalue()
    except Exception as e:
        output = str(e)
    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(debug=True)
