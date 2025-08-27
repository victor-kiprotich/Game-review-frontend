import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      documentId,
      name
    }
  }
`

export default function SiteHeader() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  if (loading) return <p>Please wait as the categories load…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="site-header">
      <div className="header-top">
        <Link to="/"><h1>Game Reviews</h1></Link>
        <button 
          className="toggle-btn" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
      
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.map(category => (
          <Link key={category.documentId} to={`/category/${category.documentId}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
