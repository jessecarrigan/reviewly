import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setBookName: '',
      setReview: '',
      fetchData: [],
      reviewUpdate: ''
    }
  }

  handleBookReview = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleUpdateBookReview = (event) => {
    this.setState({
      reviewUpdate: event.target.value
    });
  }

  componentDidMount() {
    axios.get('/api/reviews')
    .then((response) => {
      this.setState({
        fetchData: response.data
      });
    });
  };

  submit = () => {
    axios.post('/api/reviews', this.state)
      .then(() => { window.alert('Successfully posted review')});
    console.log(this.state);
    document.location.reload();
  }
  
  delete = (id) => {
    if (window.confirm('Do you want to delete this review?')) {
      axios.delete(`/api/reviews/${id}`);
      document.location.reload();
    }
  }
  
  edit = (id) => {
    axios.put(`/api/reviews/${id}`, this.state);
    document.location.reload();
  }

  render() {
    let card = this.state.fetchData.map((val, key) => {
        return (
            <React.Fragment>
                <Card style={{ width: '18rem' }} className='m-2'>
                    <Card.Body>
                        <Card.Title>{val.book_name}</Card.Title>
                        <Card.Text>
                            {val.book_review}
                        </Card.Text>
                        <input name='reviewUpdate' onChange={this.handleUpdateBookReview} placeholder='Update Review' ></input>
                        <Button className='m-2' onClick={() => { this.edit(val.id) }}>Update</Button>
                        <Button onClick={() => { this.delete(val.id) }}>Delete</Button>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    })
  
    return (
        <div className='App'>
            <h1>Reviewly</h1>
            <h2>Your home for book reviews</h2>
            <div className='form'>
                <input name='setBookName' placeholder='Enter Book Name' onChange={this.handleBookReview} />
                <input name='setReview' placeholder='Enter Review' onChange={this.handleBookReview} />
            </div>
            <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br /><br />
            <Container>
                <Row>
                    {card}
                </Row>
            </Container>
        </div>
    );
  }
}

export default App;
