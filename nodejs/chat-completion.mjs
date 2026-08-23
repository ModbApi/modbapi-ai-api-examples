const apiKey = process.env.MODB_API_KEY?.trim()
const baseUrl = (process.env.MODB_BASE_URL || 'https://modbapi.com/v1').replace(/\/$/, '')
const model = process.env.MODB_MODEL?.trim()
const timeoutMs = Number(process.env.MODB_TIMEOUT_SECONDS || 30) * 1000

if (!apiKey || apiKey.startsWith('sk-your')) throw new Error('Set MODB_API_KEY in ../.env.')
if (!model || model.startsWith('replace-')) throw new Error('Set MODB_MODEL in ../.env.')

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), timeoutMs)
try {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: 'Reply with one short greeting.' }],
      stream: false,
      max_tokens: 64,
    }),
    signal: controller.signal,
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(`${response.status}: ${payload.error?.message || JSON.stringify(payload)}`)
  console.log(payload.choices?.[0]?.message?.content || '(empty response)')
  if (payload.usage?.total_tokens) console.log(`tokens: ${payload.usage.total_tokens}`)
} finally {
  clearTimeout(timeout)
}
