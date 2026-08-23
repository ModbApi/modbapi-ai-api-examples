"""Stream a chat completion and print text as it arrives."""

import os

from dotenv import load_dotenv
from openai import OpenAI


def required(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value or value.startswith("replace-") or value.startswith("sk-your"):
        raise SystemExit(f"Set {name} in .env before running this example.")
    return value


load_dotenv()
client = OpenAI(
    api_key=required("MODB_API_KEY"),
    base_url=os.getenv("MODB_BASE_URL", "https://modbapi.com/v1").rstrip("/"),
    timeout=float(os.getenv("MODB_TIMEOUT_SECONDS", "30")),
)

stream = client.chat.completions.create(
    model=required("MODB_MODEL"),
    messages=[{"role": "user", "content": "Count from one to three."}],
    max_tokens=64,
    stream=True,
)

for chunk in stream:
    text = chunk.choices[0].delta.content if chunk.choices else None
    if text:
        print(text, end="", flush=True)
print()
