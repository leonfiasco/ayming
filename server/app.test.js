const request = require('supertest');
const app = require('./app');

let postId;

describe('Blog Posts Api', () => {
	it('GET /posts ---> array of blog posts', async () => {
		return await request(app)
			.get('/posts')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				const ids = res.body.map((item) => {
					return item._id;
				});
				postId = ids[1];
			})
			.then((res) => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							title: expect.any(String),
							description: expect.any(String),
							author: expect.any(String),
						}),
					])
				);
			});
	});

	it('GET /posts/:id ---> specific Post by ID', async () => {
		return await request(app)
			.get(`/posts/${postId}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						title: expect.any(String),
						description: expect.any(String),
						author: expect.any(String),
					})
				);
			});
	});

	it('GET /posts/:id not found ---> 404', () => {
		return request(app)
			.get(`/posts/${postId !== postId}`)
			.expect(404);
	});

	it('POST /posts/add-post ---> created Post', async () => {
		return await request(app)
			.post('/posts/add-post')
			.expect('Content-Type', /json/)
			.send({
				title: 'testing',
				description: 'testy',
				author: 'test',
			})
			.expect(201)
			.then((res) => {
				expect(res.body.createdBlog).toEqual(
					expect.objectContaining({
						title: expect.any(String),
						description: expect.any(String),
						author: expect.any(String),
					})
				);
			});
	});

	it('PATCH /posts/edit/:id ---> updated existing post', async () => {
		return await request(app)
			.patch(`/posts/edit/${postId}`)
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('DElETE /posts/:id  ---> delete single post', async () => {
		return await request(app)
			.delete(`/posts/${postId}`)
			.expect('Content-Type', /json/)
			.expect(201);
	});
});
