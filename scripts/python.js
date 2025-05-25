let pyodide;

async function loadPyodideAndRun() {
  pyodide = await loadPyodide();
}

loadPyodideAndRun();

document.getElementById("runBtn").addEventListener("click", async () => {
  const code = window.editor.state.doc.toString();
  try {
    let result = await pyodide.runPythonAsync(code);
    document.getElementById("console").textContent = result || "✓ Code executed";
  } catch (err) {
    document.getElementById("console").textContent = `Error:\n${err}`;
  }
});