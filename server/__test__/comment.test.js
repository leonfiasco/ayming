const request = require('supertest');
const app = require('../app');

let postId;

describe('Comment Posts Api', () => {
	it('GET /getComments/:postId ---> array of comments ', async () => {
		return await request(app)
			.get(`/comments/getComments/630f724c525b14fa39ffc60b`)
			.expect(200)
			.expect((res) => {
				const ids = res.body.comment.map((item) => {
					return item._id;
				});
				postId = ids[1];
			})
			.then((res) => {
				expect(res.body.comment).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							commentAuthor: expect.any(String),
							content: expect.any(String),
							postId: expect.any(String),
						}),
					])
				);
			});
	});

	it('POST /add-comment ---> create Comment', async () => {
		return await request(app)
			.post('/comments/add-comment')
			.expect('Content-Type', /json/)
			.send({
				commentAuthor: 'testing',
				content: 'testy',
				postId: '630f724c525b14fa39ffc60b',
			})
			.expect(201)
			.then((res) => {
				expect(res.body.createdComment).toEqual(
					expect.objectContaining({
						commentAuthor: expect.any(String),
						content: expect.any(String),
						postId: expect.any(String),
					})
				);
			});
	});

	it('POST /saveComment ---> save reply comment', async () => {
		return await request(app)
			.post('/comments/saveComment')
			.send({
				commentAuthor: 'testing',
				content: 'testy',
				postId: '630f724c525b14fa39ffc60b',
			})
			.then((res) => {
				expect(res.body.result).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							commentAuthor: expect.any(String),
							content: expect.any(String),
							postId: expect.any(String),
						}),
					])
				);
			});
	});
});
