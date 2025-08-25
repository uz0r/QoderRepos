import React from 'react'

const ApiKeyInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const isValid = value.trim().length > 0

  return (
    <div className="api-key-input">
      <label htmlFor="api-key" className="input-label">
        🔑 OpenRouter API Key
      </label>
      <input
        id="api-key"
        type="password"
        placeholder="Enter your OpenRouter API key..."
        value={value}
        onChange={handleChange}
        className={`input-field ${isValid ? 'valid' : 'invalid'}`}
        required
      />
      <div className="input-help">
        <p>
          Get your API key from{' '}
          <a 
            href="https://openrouter.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="help-link"
          >
            OpenRouter
          </a>
        </p>
        {!isValid && value.length > 0 && (
          <p className="validation-error">API key is required</p>
        )}
      </div>
    </div>
  )
}

export default ApiKeyInput