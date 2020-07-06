import React, { useState, useEffect } from 'react'

const KeywordFormatter = () => {
  const [input, setInput] = useState('')
  const [bmm, setBmm] = useState(true)
  const [em, setEm] = useState(true)
  const [output, setOutput] = useState('')

  useEffect(() => {
    const keywords = getKeywords(input)
    const bmmKeywords = getBmmKeywords(keywords)
    const emKeywords = getEmKeywords(keywords)

    let formattedKeywords = []
    formattedKeywords = formattedKeywords.concat(bmmKeywords)
    formattedKeywords = formattedKeywords.concat(emKeywords)

    const output = getOutput(formattedKeywords)

    setOutput(output)
    //eslint-disable-next-line
  }, [input, bmm, em])

  const getKeywords = (input) => {
    let keywords = input.split(/\r?\n/g)

    keywords = keywords.filter((keyword) => {
      return keyword !== ''
    })

    return keywords
  }

  const getBmmKeywords = (keywords) => {
    let bmmKeywords = []

    keywords.forEach((keyword) => {
      const words = keyword.split(' ')
      let bmmKeyword = []

      words.forEach((word) => {
        bmmKeyword += `+${word} `
      })

      bmmKeyword = bmmKeyword.trim()

      bmmKeywords.push(bmmKeyword)
    })

    return bmm ? bmmKeywords : []
  }

  const getEmKeywords = (keywords) => {
    let emKeywords = []

    keywords.forEach((keyword) => {
      const emKeyword = `[${keyword}]`

      emKeywords.push(emKeyword)
    })

    return em ? emKeywords : []
  }

  const getOutput = (keywords) => {
    let output = ''

    keywords.forEach((keyword) => {
      output += `${keyword}\n`
    })

    output = output.trim()

    return output
  }

  const copyKeywordsToClipboard = () => {
    const outputField = document.querySelector('#output')
    outputField.select()
    outputField.setSelectionRange(0, 99999)
    document.execCommand('copy')
  }

  return (
    <div className="KeywordFormatter">
      <div className="row">
        <div className="col-lg-5 mb-5 mb-lg-0">
          <h2 className="h5">Keywords</h2>
          <textarea
            className="form-control"
            id="input"
            rows="10"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
        <div className="col-lg-2 mb-5 mb-lg-0">
          <h2 className="h5">Match types</h2>
          <div className="mb-2 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="bmm"
              onChange={(e) => setBmm(e.target.checked)}
              checked={bmm}
            />
            <label className="form-check-label" htmlFor="bmm">
              Broad match modifier
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="em"
              onChange={(e) => setEm(e.target.checked)}
              checked={em}
            />
            <label className="form-check-label" htmlFor="em">
              Exact match
            </label>
          </div>
        </div>
        <div className="col-lg-5">
          <h2 className="h5">Output</h2>
          <div className="position-relative">
            <textarea
              readOnly={true}
              className="form-control"
              id="output"
              rows="10"
              value={output}
            ></textarea>
            <button className="copy-button" onClick={copyKeywordsToClipboard}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordFormatter
