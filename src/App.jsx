import { useState } from "react";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'Segoe UI', sans-serif;
    padding: 20px;
  }
  .container {
    max-width: 860px;
    margin: 0 auto;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 40px;
    backdrop-filter: blur(10px);
  }
  .header { text-align: center; margin-bottom: 32px; }
  .header h1 { font-size: 2rem; color: white; margin-bottom: 8px; }
  .header p { color: #aaa; font-size: 1rem; }
  .badge {
    display: inline-block;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  label { font-weight: 600; color: #ccc; display: block; margin-bottom: 8px; }
  textarea, select {
    width: 100%;
    padding: 16px;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-size: 14px;
    resize: vertical;
    transition: border 0.3s;
    font-family: monospace;
    outline: none;
    background: rgba(255,255,255,0.05);
    color: white;
  }
  textarea:focus, select:focus { border-color: #667eea; }
  select { font-family: 'Segoe UI', sans-serif; cursor: pointer; }
  select option { background: #302b63; color: white; }
  .select-wrapper { margin: 24px 0; }
  .explain-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
  }
  .explain-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(102,126,234,0.4); }
  .explain-btn:disabled { background: #444; cursor: not-allowed; transform: none; box-shadow: none; }
  .loading {
    text-align: center;
    padding: 40px;
    color: #667eea;
    font-weight: 600;
    font-size: 16px;
  }
  .spinner {
    width: 40px; height: 40px;
    border: 4px solid rgba(102,126,234,0.2);
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .results { margin-top: 36px; }
  .result-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
  }
  .result-card h3 {
    color: #667eea;
    margin-bottom: 12px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .result-card p, .result-card pre {
    color: #ddd;
    font-size: 14px;
    line-height: 1.8;
    white-space: pre-wrap;
    font-family: inherit;
  }
  @media (max-width: 600px) {
    .container { padding: 20px 16px; }
    .header h1 { font-size: 1.5rem; }
  }
`;

export default function App() {
  const [code, setCode] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const explainCode = async () => {
    if (!code.trim()) return alert("Please paste some code first!");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://code-explainer-q54y.onrender.com/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, level }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not connected yet — we will do that next!");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <div className="badge">⚡ LLM Powered</div>
          <h1>🔍 AI Code Explainer</h1>
          <p>Paste any code and get a full AI explanation instantly</p>
        </div>

        <label>💻 Paste your code:</label>
        <textarea
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`# Paste any code here...\ndef hello():\n    print("Hello World")`}
        />

        <div className="select-wrapper">
          <label>🎯 Explanation level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>

        <button
          className="explain-btn"
          onClick={explainCode}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "✨ Explain My Code"}
        </button>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            AI is analyzing your code...
          </div>
        )}

        {result && (
          <div className="results">
            <div className="result-card">
              <h3>📝 What this code does</h3>
              <p>{result.summary}</p>
            </div>
            <div className="result-card">
              <h3>🔍 Line by line explanation</h3>
              <p>{result.explanation}</p>
            </div>
            <div className="result-card">
              <h3>⚠️ Potential issues</h3>
              <p>{result.issues}</p>
            </div>
            <div className="result-card">
              <h3>💡 How to improve</h3>
              <p>{result.improvements}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}