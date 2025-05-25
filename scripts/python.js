let pyodide = null;

async function loadPyodideAndRun() {
  pyodide = await loadPyodide();
  document.getElementById("runBtn").disabled = false;
}

document.getElementById("runBtn").disabled = true;
loadPyodideAndRun();

document.getElementById("runBtn").addEventListener("click", async () => {
  if (!window.editor || !pyodide) {
    document.getElementById("console").textContent = "Editor or Pyodide not ready yet.";
    return;
  }

  const code = window.editor.state.doc.toString();
  try {
    let result = await pyodide.runPythonAsync(code);
    document.getElementById("console").textContent = result || "✓ Code executed";
  } catch (err) {
    document.getElementById("console").textContent = `Error:\n${err}`;
  }
});
