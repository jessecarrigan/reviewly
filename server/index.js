'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const Body = require('koa-body');
const Knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'postgres',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }
});

const app = new Koa();
const router = new Router();

// Response to get requests
router.get('/', async(context) => {
    context.body = 'Hello, World!\n';
});

// Get book reviews
router.get('/reviews', async(context) => {
    const reviews = await Knex.select()
        .from('books_reviews');
    console.log(reviews);
    context.body = reviews;
});

// Create book review
router.post('/reviews', Body(), async(context) => {
    const book = context.request.body.bookName;
    const review = context.request.body.bookReview;
    const result = await Knex('books_reviews')
        .insert({book_name: book, book_review: review});
    console.log(result);
    context.body = result;
});

// Delete book review
router.delete('/reviews/:id', async(context) => {
    const id = context.params.id;
    const result = await Knex('books_reviews')
        .where('id', '=', id)
        .del();    
    console.log(result);
    context.body = result;
});

// Update book review
router.put('/reviews/:id', Body(), async(context) => {
    const id = context.params.id;
    const review = context.request.body.reviewUpdate;
    console.log(`New Review: ${review}`);
    const result = await Knex('books_reviews')
        .where('id', '=', id)
        .update('book_review', review);
    console.log(result);
    context.body = result;
});

// Add routes and response to requests
app.use(router.routes())
    .use(router.allowedMethods());

// Start app
app.listen(3001, () => {
    console.log('Server running on port 8080');
});