function analizar() {
    const code = document.getElementById("code").value;
    try {
        let resultado = parser.parse(code);
        document.getElementById("resultado").innerText = JSON.stringify(resultado, null, 2);
    } catch (error) {
        document.getElementById("resultado").innerText = "Error: " + error.message;
    }
}
