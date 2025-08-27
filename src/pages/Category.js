import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

// GraphQL query: fetch one category and its reviews
const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(documentId: $id) {
      name
      reviews {
        documentId
        title
        body
        rating
        categories {
          name
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id }
  })

  if (loading) return <p>Loading category…</p>
  if (error) return <p>Error: {error.message}</p>

  const category = data?.category
  if (!category) return <p>No category found.</p>

  return (
    <div className="categories">
      <h2>{category.name}</h2>
      {category.reviews.length === 0 && <p>No reviews yet in this category.</p>}
      {category.reviews.map((review) => (
        <div key={review.documentId} className="review-card">
          <div className="rating">{review.rating}/10</div>
          <h2>{review.title}</h2>
          <div className="categories">
            {review.categories.map(c => (
              <small key={c.id}>{c.name}</small>
            ))}
          </div>
          <p>{(review.body ?? "").substring(0, 200)}...</p>
          <Link to={`/details/${review.documentId}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
