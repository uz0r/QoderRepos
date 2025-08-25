import React from 'react'

const SubmitButton = ({ onClick, disabled, isLoading }) => {
  const buttonText = isLoading 
    ? '🔍 Analyzing progression balance...'
    : '🎮 Analyze Game Progression'

  const buttonClass = `submit-button ${disabled ? 'disabled' : 'enabled'} ${isLoading ? 'loading' : ''}`

  return (
    <div className="submit-section">
      <button
        onClick={onClick}
        disabled={disabled}
        className={buttonClass}
        type="button"
        aria-label={isLoading ? 'Analyzing sequence' : 'Analyze sequence'}
      >
        {isLoading && (
          <span className="spinner" role="status" aria-hidden="true">
            ⚙️
          </span>
        )}
        <span className="button-text">{buttonText}</span>
      </button>
      
      {disabled && !isLoading && (
        <p className="button-help">
          💡 Enter your API key and sequence data to get started
        </p>
      )}
      
      {isLoading && (
        <div className="loading-tips">
          <p>🎯 <strong>While we analyze your progression:</strong></p>
          <ul>
            <li>We're identifying mathematical patterns in your sequence</li>
            <li>Checking for common game design progressions</li>
            <li>Evaluating player experience and balance</li>
            <li>Comparing against industry best practices</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default SubmitButton