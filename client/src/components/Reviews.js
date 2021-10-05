import React from 'react';
import '../App.css';
import { Button, Card } from 'react-bootstrap';
function Reviews({ reviews, updateReview, editReview, deleteReview }) {

  return reviews.map((review, key) => {
    return (
        <Card style={{ width: '18rem' }} className='m-2' key={review.id}>
            <Card.Body>
                <Card.Title>{review.book_name}</Card.Title>
                <Card.Text>
                    {review.book_review}
                </Card.Text>
                <input name='reviewUpdate' onChange={e => updateReview(e.target.value)} placeholder='Update Review' ></input>
                <Button className='m-2' onClick={() => { editReview(review.id) }}>Update</Button>
                <Button onClick={() => { deleteReview(review.id) }}>Delete</Button>
            </Card.Body>
        </Card>
        )
    });    
}

export default Reviews;
