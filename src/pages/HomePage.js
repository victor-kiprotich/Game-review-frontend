import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const REVIEWS_QUERY = gql`
  query GetReviews {
    reviews {
      documentId,
      title,
      rating,
      body
      categories{
        name 
      }
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS_QUERY);

  if (loading) return <p>Please wait as the game reviews load up....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.documentId} className="review-card">
          <div className="rating">
            <h2>{review.title}</h2>

            {review.categories.map(c => (
              <small key={c.id}>{c.name}</small>
            ))}


            <small>Rating: {review.rating}/10</small>
            <p>{(review.body ?? "").substring(0, 200)}...</p>
            <Link to={`/details/${review.documentId}`}>Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
