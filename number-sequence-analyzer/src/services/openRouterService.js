// OpenRouter API service for game sequence analysis
class OpenRouterService {
  constructor() {
    this.baseURL = 'https://openrouter.ai/api/v1/chat/completions'
  }

  // Game design focused system prompt for sequence formatting
  getSystemPrompt() {
    return `You are a specialized game design consultant and mathematician focusing on numerical progression systems in games. 

Your expertise includes:
- XP/Level progression curves (linear, quadratic, exponential)
- Damage scaling systems and balance
- Economy progression (building costs, upgrade prices)
- Time gate mechanics (wait times, cooldowns)
- Drop rate progressions and probability curves
- IAP pricing tier optimization
- Piecewise progression systems (different formulas for different game phases)

When analyzing number sequences:
1. First format the given data into a clean markdown table with proper headers
2. Identify the mathematical pattern (arithmetic, geometric, polynomial, exponential, logarithmic, or piecewise)
3. Provide game design insights including:
   - What type of game mechanic this represents
   - Player experience assessment (too steep, balanced, too shallow)
   - Recommendations for improvement
   - Examples of games using similar progressions
   - Potential monetization implications

Format your response in clear markdown with:
- A formatted table of the sequence
- Mathematical analysis section
- Game design assessment section
- Recommendations section

Focus on practical game design insights rather than pure mathematics.`
  }

  // Create user prompt for sequence analysis
  createUserPrompt(sequenceInput) {
    return `Analyze this game progression sequence:

${sequenceInput}

Please provide:
1. A clean markdown table of the numbers
2. Mathematical pattern identification
3. Game design analysis and recommendations
4. Player experience assessment
5. Similar games or mechanics that use this pattern`
  }

  // Main API call method
  async analyzeSequence(apiKey, model, sequenceInput) {
    if (!apiKey || !apiKey.trim()) {
      throw new Error('API key is required')
    }

    if (!sequenceInput || !sequenceInput.trim()) {
      throw new Error('Sequence input is required')
    }

    const requestBody = {
      model: model,
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt()
        },
        {
          role: 'user',
          content: this.createUserPrompt(sequenceInput)
        }
      ],
      temperature: 0.1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Number Sequence Analyzer'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        switch (response.status) {
          case 401:
            throw new Error('Invalid API key. Please check your OpenRouter API key.')
          case 429:
            throw new Error('Rate limit exceeded. Please wait a moment and try again.')
          case 500:
            throw new Error('OpenRouter service error. Please try again later.')
          default:
            throw new Error(
              errorData.error?.message || 
              `API request failed with status ${response.status}`
            )
        }
      }

      const data = await response.json()
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API')
      }

      return {
        content: data.choices[0].message.content,
        model: data.model,
        usage: data.usage,
        requestId: data.id
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.')
      }
      throw error
    }
  }

  // Validate API key format (basic check)
  validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      return false
    }
    
    // Basic format check - OpenRouter keys typically start with 'sk-or-'
    const trimmed = apiKey.trim()
    return trimmed.length > 10 && (trimmed.startsWith('sk-or-') || trimmed.startsWith('sk-'))
  }

  // Check if model is supported
  isSupportedModel(model) {
    const supportedModels = [
      'openai/gpt-3.5-turbo',
      'anthropic/claude-3-haiku',
      'meta-llama/llama-3.1-8b-instruct'
    ]
    return supportedModels.includes(model)
  }
}

// Export singleton instance
export default new OpenRouterService()