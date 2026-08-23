const apiKey = process.env.MODB_API_KEY?.trim()
const baseUrl = (process.env.MODB_BASE_URL || 'https://modbapi.com/v1').replace(/\/$/, '')
const model = process.env.MODB_MODEL?.trim()
if (!apiKey || apiKey.startsWith('sk-your')) throw new Error('Set MODB_API_KEY in ../.env.')
if (!model || model.startsWith('replace-')) throw new Error('Set MODB_MODEL in ../.env.')

const response = await fetch(`${baseUrl}/chat/completions`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model,
    messages: [{ role: 'user', content: 'Count from one to three.' }],
    stream: true,
    max_tokens: 64,
  }),
})
if (!response.ok || !response.body) throw new Error(`${response.status}: ${await response.text()}`)

const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
let buffer = ''
while (true) {
  const { value, done } = await reader.read()
  if (done) break
  buffer += value
  const lines = buffer.split('\n')
  buffer = lines.pop() || ''
  for (const line of lines) {
    if (!line.startsWith('data: ') || line === 'data: [DONE]') continue
    const chunk = JSON.parse(line.slice(6))
    const text = chunk.choices?.[0]?.delta?.content
    if (text) process.stdout.write(text)
  }
}
process.stdout.write('\n')
