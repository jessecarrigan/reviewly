import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Row } from 'react-bootstrap';
import Reviews from './components/Reviews';

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

  const getReviews = () => {
    axios.get('/api/reviews')
    .then((response) => {
      setReviews(response.data);
    });
  };

  const submitReview = () => {
    const newReview = {
      bookName: bookName,
      bookReview: bookReview
    };

    axios.post('/api/reviews', newReview)
    .then(() => { 
      window.alert('Successfully posted review');
      getReviews();
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
      getReviews();
    });
  };
    
  return (
      <div className='App'>
          <h1>Reviewly</h1>
          <h2>Your home for book reviews</h2>
          <span>{error.message}</span>
          <div className='form'>
              <input name='bookName' placeholder='Enter Book Name' onChange={e => setBookName(e.target.value)} />
              <input name='bookReview' placeholder='Enter Review' onChange={e => setBookReview(e.target.value)} />
          </div>
          <Button className='my-2' variant="primary" onClick={submitReview}>Submit</Button> <br /><br />
          <Container>
              <Row>
                  <Reviews reviews={reviews} updateReview={setReviewUpdate} deleteReview={deleteReview} editReview={editReview}/>
              </Row>
          </Container>
      </div>
    );
}

export default App;
