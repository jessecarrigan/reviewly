import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap';
function App() {
  const [reviews, setReviews] = useState([]);
  const [bookName, setBookName] = useState('');
  const [bookReview, setBookReview] = useState('');
  const [reviewUpdate, setReviewUpdate] = useState('');
  const [error, setError] = useState({});

  // Fetch reviews
  useEffect(() => {
    axios.get('/api/reviews')
    .then((response) => {
      setReviews(response.data)
    })
    .catch(error => {
      setError(error);
    });
  }, [setReviews]);

  const submitReview = () => {
    const newReview = {
      bookName: bookName,
      bookReview: bookReview
    };
    axios.post('/api/reviews', newReview)
    .then((response) => { 
      console.log(response.data);
      window.alert('Successfully posted review')
      axios.get('/api/reviews')
      .then((response) => {
        setReviews(response.data)
      });
    })
    .catch(error => {
      setError(error);
    });
  };

  const deleteReview = (id) => {
    if (window.confirm('Do you want to delete this review?')) {
      axios.delete(`/api/reviews/${id}`)
      .then(() => setReviews(reviews.filter((review) => {
        return review.id !== id;
      })));
    }
  };

  const editReview = (id) => {
    axios.put(`/api/reviews/${id}`, {
      reviewUpdate: reviewUpdate
    })
    .then(() => {
      axios.get('/api/reviews')
      .then((response) => {
        setReviews(response.data)
      })
    });
  };

  let card = reviews.map((val, key) => {
    return (
        <>
            <Card style={{ width: '18rem' }} className='m-2'>
                <Card.Body>
                    <Card.Title>{val.book_name}</Card.Title>
                    <Card.Text>
                        {val.book_review}
                    </Card.Text>
                    <input name='reviewUpdate' onChange={e => setReviewUpdate(e.target.value)} placeholder='Update Review' ></input>
                    <Button className='m-2' onClick={() => { editReview(val.id) }}>Update</Button>
                    <Button onClick={() => { deleteReview(val.id) }}>Delete</Button>
                </Card.Body>
            </Card>
        </>
        )
    });    
    
    return (
        <div className='App'>
            <h1>Reviewly</h1>
            <h2>Your home for book reviews</h2>
            <div className='form'>
                <input name='bookName' placeholder='Enter Book Name' onChange={e => setBookName(e.target.value)} />
                <input name='bookReview' placeholder='Enter Review' onChange={e => setBookReview(e.target.value)} />
            </div>
            <Button className='my-2' variant="primary" onClick={submitReview}>Submit</Button> <br /><br />
            <Container>
                <Row>
                    {card}
                </Row>
            </Container>
        </div>
    );
}

export default App;
