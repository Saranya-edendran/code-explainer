import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    min-height: 100vh;
    background-color: #0a0a0f;
    background-image: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%);
    font-family: 'Inter', sans-serif;
    color: #e2e8f0;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
  }

  .nav {
    width: 100%;
    max-width: 780px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  .nav-logo {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .nav-logo span { color: #6366f1; }

  .hero {
    text-align: center;
    margin-bottom: 48px;
    max-width: 600px;
  }

  .hero h1 {
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -1.5px;
    line-height: 1.1;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .hero h1 span {
    background: linear-gradient(135deg, #6366f1, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero p {
    font-size: 16px;
    color: #64748b;
    line-height: 1.7;
    font-weight: 400;
  }

  .card {
    width: 100%;
    max-width: 780px;
    background: #0f0f17;
    border: 1px solid #1e1e2e;
    border-radius: 16px;
    overflow: hidden;
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #1e1e2e;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #ff5f57; }
  .dot-yellow { background: #febc2e; }
  .dot-green { background: #28c840; }

  .card-title {
    font-size: 12px;
    color: #475569;
    font-family: 'JetBrains Mono', monospace;
    margin-left: 8px;
  }

  textarea {
    width: 100%;
    padding: 20px;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #94a3b8;
    resize: vertical;
    min-height: 200px;
    line-height: 1.8;
  }

  textarea::placeholder { color: #2d3748; }

  .controls {
    width: 100%;
    max-width: 780px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
  }

  .level-select {
    flex: 1;
    padding: 12px 16px;
    background: #0f0f17;
    border: 1px solid #1e1e2e;
    border-radius: 10px;
    color: #94a3b8;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    cursor: pointer;
    appearance: none;
  }

  .level-select option { background: #0f0f17; }

  .analyze-btn {
    padding: 12px 28px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    letter-spacing: -0.2px;
  }

  .analyze-btn:hover { background: #5558e8; transform: translateY(-1px); }
  .analyze-btn:disabled { background: #1e1e2e; color: #475569; cursor: not-allowed; transform: none; }

  .loading-bar {
    width: 100%;
    max-width: 780px;
    margin-top: 24px;
    height: 2px;
    background: #1e1e2e;
    border-radius: 2px;
    overflow: hidden;
  }

  .loading-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #a78bfa);
    animation: loading 1.5s ease-in-out infinite;
    width: 40%;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  .loading-text {
    text-align: center;
    margin-top: 12px;
    font-size: 13px;
    color: #475569;
    font-family: 'JetBrains Mono', monospace;
  }

  .results {
    width: 100%;
    max-width: 780px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .result-block {
    background: #0f0f17;
    border: 1px solid #1e1e2e;
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .result-block:hover { border-color: rgba(99,102,241,0.3); }

  .result-block-header {
    padding: 12px 18px;
    border-bottom: 1px solid #1e1e2e;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .result-tag {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 3px 8px;
    border-radius: 4px;
  }

  .tag-summary { background: rgba(99,102,241,0.1); color: #6366f1; }
  .tag-explanation { background: rgba(16,185,129,0.1); color: #10b981; }
  .tag-issues { background: rgba(245,158,11,0.1); color: #f59e0b; }
  .tag-improvements { background: rgba(139,92,246,0.1); color: #8b5cf6; }
  .tag-complexity { background: rgba(236,72,153,0.1); color: #ec4899; }
  .tag-testcases { background: rgba(20,184,166,0.1); color: #14b8a6; }

  .result-block-body {
    padding: 18px;
    font-size: 13.5px;
    line-height: 1.8;
    color: #94a3b8;
    white-space: pre-wrap;
    font-family: inherit;
  }

  @media (max-width: 600px) {
    .hero h1 { font-size: 28px; }
    .controls { flex-direction: column; }
    .analyze-btn { width: 100%; }
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
      alert("Something went wrong. Please try again!");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <nav className="nav">
          <div className="nav-logo">code<span>.</span>explain</div>
        </nav>

        <div className="hero">
          <h1>Understand any code<br /><span>instantly.</span></h1>
          <p>Paste a code snippet and get a detailed explanation, potential issues, and improvement suggestions — powered by AI.</p>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="dot dot-red"></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
            <span className="card-title">paste your code here</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`# Example\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid`}
            rows={12}
          />
        </div>

        <div className="controls">
          <select
            className="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <button
            className="analyze-btn"
            onClick={explainCode}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>

        {loading && (
          <div style={{width: "100%", maxWidth: "780px", marginTop: "24px"}}>
            <div className="loading-bar">
              <div className="loading-bar-fill"></div>
            </div>
            <div className="loading-text">analyzing your code...</div>
          </div>
        )}

        {result && (
          <div className="results">
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-summary">Overview</span>
              </div>
              <div className="result-block-body">{result.summary}</div>
            </div>
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-explanation">Explanation</span>
              </div>
              <div className="result-block-body">{result.explanation}</div>
            </div>
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-issues">Issues</span>
              </div>
              <div className="result-block-body">{result.issues}</div>
            </div>
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-improvements">Improvements</span>
              </div>
              <div className="result-block-body">{result.improvements}</div>
            </div>
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-complexity">Complexity</span>
              </div>
              <div className="result-block-body">{result.complexity}</div>
            </div>
            <div className="result-block">
              <div className="result-block-header">
                <span className="result-tag tag-testcases">Test Cases</span>
              </div>
              <div className="result-block-body">{result.testcases}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}