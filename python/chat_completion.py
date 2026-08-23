"""Send one non-streaming OpenAI-compatible chat completion request."""

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

response = client.chat.completions.create(
    model=required("MODB_MODEL"),
    messages=[{"role": "user", "content": "Reply with one short greeting."}],
    max_tokens=64,
)

print(response.choices[0].message.content or "(empty response)")
if response.usage:
    print(f"tokens: {response.usage.total_tokens}")
