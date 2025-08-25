import React from 'react'

const ModelSelector = ({ value, onChange }) => {
  const models = [
    { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and reliable' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', description: 'Good reasoning' },
    { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Open source' }
  ]

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const selectedModel = models.find(model => model.id === value)

  return (
    <div className="model-selector">
      <label htmlFor="model-select" className="input-label">
        🤖 AI Model
      </label>
      <select
        id="model-select"
        value={value}
        onChange={handleChange}
        className="select-field"
      >
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.name} - {model.description}
          </option>
        ))}
      </select>
      <div className="input-help">
        <p>
          Selected: <strong>{selectedModel?.name}</strong> - {selectedModel?.description}
        </p>
        <p className="model-note">
          All models are optimized for game design analysis
        </p>
      </div>
    </div>
  )
}

export default ModelSelector