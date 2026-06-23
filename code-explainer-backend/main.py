from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class CodeRequest(BaseModel):
    code: str
    level: str

@app.post("/explain")
def explain_code(request: CodeRequest):
    prompt = f"""
    You are an expert programming teacher.
    Analyze this code and explain it for a {request.level} level programmer.
    
    Respond in EXACTLY this format:
    SUMMARY: <one paragraph summary of what the code does>
    EXPLANATION: <line by line explanation>
    ISSUES: <any bugs or potential problems, or "No issues found">
    IMPROVEMENTS: <suggestions to improve the code>
    
    Code to analyze:
    {request.code}
    """
    
    response = client.chat.completions.create(
       model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1500
    )
    
    text = response.choices[0].message.content
    
    def extract(tag):
        tags = ["SUMMARY:", "EXPLANATION:", "ISSUES:", "IMPROVEMENTS:"]
        start = text.find(f"{tag}:") + len(f"{tag}:")
        next_tags = [t for t in tags if t != f"{tag}:" and text.find(t) > text.find(f"{tag}:")]
        end = min([text.find(t) for t in next_tags], default=len(text))
        return text[start:end].strip()
    
    return {
        "summary": extract("SUMMARY"),
        "explanation": extract("EXPLANATION"),
        "issues": extract("ISSUES"),
        "improvements": extract("IMPROVEMENTS")
    }