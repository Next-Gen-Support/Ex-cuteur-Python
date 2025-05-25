import { EditorView, basicSetup } from "https://codemirror.net/6/package/codemirror.bundle.min.js";
import { python } from "@codemirror/lang-python";

window.editor = new EditorView({
  doc: "# Write your Python code here\nprint('Hello from Python!')",
  extensions: [basicSetup, python()],
  parent: document.getElementById("editor")
});