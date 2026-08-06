const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    if (typeof payload === 'string' && payload) {
      throw new Error(payload)
    }

    const detail = payload?.detail || payload?.message || `요청이 실패했습니다. (${response.status})`
    throw new Error(detail)
  }

  return payload
}

export async function fetchModels() {
  const response = await fetch(`${API_BASE_URL}/models`)
  const payload = await parseResponse(response)
  return payload.models || []
}

export async function sendChatMessage({
  message,
  model,
  systemPrompt,
  temperature,
  topP,
  numPredict,
}) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      model,
      system_prompt: systemPrompt,
      temperature,
      top_p: topP,
      num_predict: numPredict,
    }),
  })

  return parseResponse(response)
}
