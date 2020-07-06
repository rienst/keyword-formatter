import React from 'react'
import './scss/main.scss'
import KeywordFormatter from './components/KeywordFormatter'

const Site = () => {
  return (
    <div className="Site">
      <div className="container py-5">
        <h1 className="mb-5">Small and simple keyword formatting tool</h1>
        <KeywordFormatter />
      </div>
    </div>
  )
}

export default Site
