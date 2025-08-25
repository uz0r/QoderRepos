import { useState } from 'react'
import './App.css'
import ApiKeyInput from './components/ApiKeyInput'
import ModelSelector from './components/ModelSelector'
import SequenceTextArea from './components/SequenceTextArea'
import SubmitButton from './components/SubmitButton'
import FormattedOutput from './components/FormattedOutput'
import openRouterService from './services/openRouterService'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [selectedModel, setSelectedModel] = useState('openai/gpt-3.5-turbo')
  const [sequenceInput, setSequenceInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenRouter API key')
      return
    }
    if (!sequenceInput.trim()) {
      setError('Please enter a number sequence')
      return
    }

    // Validate API key format
    if (!openRouterService.validateApiKey(apiKey)) {
      setError('Invalid API key format. Please check your OpenRouter API key.')
      return
    }

    // Validate model
    if (!openRouterService.isSupportedModel(selectedModel)) {
      setError('Unsupported model selected. Please choose a different model.')
      return
    }

    setIsLoading(true)
    setError('')
    setOutput('')

    try {
      console.log('Analyzing sequence with:', { model: selectedModel, inputLength: sequenceInput.length })
      
      const result = await openRouterService.analyzeSequence(
        apiKey, 
        selectedModel, 
        sequenceInput
      )
      
      setOutput(result.content)
      console.log('Analysis completed:', { 
        model: result.model, 
        usage: result.usage,
        requestId: result.requestId 
      })
    } catch (err) {
      console.error('Analysis failed:', err)
      setError(`Analysis failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Number Sequence Analyzer</h1>
        <p className="subtitle">Analyze game progression systems with AI</p>
        <p className="description">
          Designed for game designers to analyze XP curves, damage scaling, 
          economy balancing, and progression formulas
        </p>
      </header>

      <main className="app-main">
        <div className="config-section">
          <h2>⚙️ Configuration</h2>
          <div className="config-inputs">
            <ApiKeyInput 
              value={apiKey} 
              onChange={setApiKey}
            />
            <ModelSelector 
              value={selectedModel} 
              onChange={setSelectedModel}
            />
          </div>
        </div>

        <div className="input-section">
          <h2>📊 Game Progression Data</h2>
          <SequenceTextArea 
            value={sequenceInput}
            onChange={setSequenceInput}
          />
          <SubmitButton 
            onClick={handleSubmit}
            disabled={!apiKey.trim() || isLoading}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="error-section">
            <p className="error-message">❌ {error}</p>
          </div>
        )}

        {output && (
          <div className="results-section">
            <h2>🔍 Analysis Results</h2>
            <FormattedOutput content={output} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
