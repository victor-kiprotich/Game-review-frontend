import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const REVIEW_QUERY = gql`
  query GetReview($id: ID!) {
    review(documentId: $id) {
      documentId
      title
      rating
      body
      categories {
        name
      }
    }
  }
`;

export default function ReviewDetails() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(REVIEW_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading review…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.review) return <p>Review not found.</p>;

  const r = data.review;
  

  return (
    <div className="review-card">
      <div className="rating">
        <h2>{r.title}</h2>

          {data.review.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}



        <small>Rating: {r.rating}/10</small>
        <p>{r.body}</p>
      </div>
    </div>
  );
}
