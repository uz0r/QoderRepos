import React from 'react'

const SequenceTextArea = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const placeholderText = `Enter your game progression numbers:

Examples:
• XP Requirements: 100, 300, 600, 1000, 1500, 2100...
• Damage Values: 10, 12, 15, 19, 24, 30...
• Building Costs: 50, 75, 112, 168, 252, 378...
• Wait Times: 5min, 10min, 20min, 40min, 80min...
• Drop Rates: 10%, 7.5%, 5.6%, 4.2%, 3.1%...
• Level-up Costs: $0.99, $1.99, $4.99, $9.99...

Supported formats:
- Comma separated: 1, 2, 3, 4, 5
- Space separated: 1 2 3 4 5
- Line separated: One number per line
- Mixed units: 100 XP, 300 XP, 600 XP
- Currency: $1, $2, $5, $10
- Percentages: 10%, 5%, 2.5%`

  const wordCount = value.trim().split(/\s+/).filter(word => word).length
  const characterCount = value.length

  return (
    <div className="sequence-textarea">
      <label htmlFor="sequence-input" className="input-label">
        📊 Game Sequence Data
      </label>
      <textarea
        id="sequence-input"
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
        className="textarea-field"
        rows={12}
        cols={50}
      />
      <div className="input-stats">
        <span className="stat">Characters: {characterCount}</span>
        <span className="stat">Words: {wordCount}</span>
        {value.trim() && (
          <span className="stat success">✓ Ready for analysis</span>
        )}
      </div>
      <div className="input-help">
        <p>💡 <strong>Game Design Tips:</strong></p>
        <ul>
          <li>Linear progression: Each level costs the same (boring but predictable)</li>
          <li>Exponential: Costs double each level (challenging but can be frustrating)</li>
          <li>Quadratic: Balanced middle ground for most games</li>
          <li>Piecewise: Different formulas for early/mid/late game phases</li>
        </ul>
      </div>
    </div>
  )
}

export default SequenceTextArea