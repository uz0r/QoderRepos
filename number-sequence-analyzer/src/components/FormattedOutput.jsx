import React from 'react'

const FormattedOutput = ({ content }) => {
  // Function to render markdown-like content
  const renderContent = (text) => {
    if (!text) return null

    // Split by lines and process each line
    const lines = text.split('\n')
    const processedLines = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Handle headers
      if (line.startsWith('# ')) {
        processedLines.push(
          <h3 key={i} className="output-header-1">
            {line.substring(2)}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        processedLines.push(
          <h4 key={i} className="output-header-2">
            {line.substring(3)}
          </h4>
        )
      } else if (line.startsWith('### ')) {
        processedLines.push(
          <h5 key={i} className="output-header-3">
            {line.substring(4)}
          </h5>
        )
      }
      // Handle table rows (basic detection)
      else if (line.includes('|') && line.trim().length > 0) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell)
        if (cells.length > 1) {
          processedLines.push(
            <div key={i} className="table-row">
              {cells.map((cell, index) => (
                <span key={index} className="table-cell">
                  {cell}
                </span>
              ))}
            </div>
          )
        }
      }
      // Handle bullet points
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        processedLines.push(
          <div key={i} className="bullet-point">
            • {line.trim().substring(2)}
          </div>
        )
      }
      // Handle numbered lists
      else if (/^\d+\.\s/.test(line.trim())) {
        processedLines.push(
          <div key={i} className="numbered-point">
            {line.trim()}
          </div>
        )
      }
      // Handle code blocks (inline)
      else if (line.includes('`')) {
        const parts = line.split('`')
        const rendered = parts.map((part, index) => 
          index % 2 === 1 ? 
            <code key={index} className="inline-code">{part}</code> : 
            part
        )
        processedLines.push(
          <p key={i} className="output-paragraph">
            {rendered}
          </p>
        )
      }
      // Handle empty lines
      else if (line.trim() === '') {
        processedLines.push(<br key={i} />)
      }
      // Regular paragraph
      else if (line.trim().length > 0) {
        processedLines.push(
          <p key={i} className="output-paragraph">
            {line}
          </p>
        )
      }
    }

    return processedLines
  }

  return (
    <div className="formatted-output">
      <div className="output-content">
        {renderContent(content)}
      </div>
      
      <div className="output-actions">
        <button 
          className="action-button"
          onClick={() => navigator.clipboard.writeText(content)}
          title="Copy to clipboard"
        >
          📋 Copy Analysis
        </button>
        <button 
          className="action-button"
          onClick={() => {
            const blob = new Blob([content], { type: 'text/markdown' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'game-sequence-analysis.md'
            a.click()
            URL.revokeObjectURL(url)
          }}
          title="Download as markdown file"
        >
          💾 Download
        </button>
      </div>

      <div className="output-footer">
        <p className="footer-note">
          🎮 <strong>Game Design Tip:</strong> Use this analysis to balance your progression systems 
          and improve player experience. Consider A/B testing different curves with your players.
        </p>
      </div>
    </div>
  )
}

export default FormattedOutput