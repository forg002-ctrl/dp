import { request } from '@src/test/start';

describe('test', () => {
    it('', async () => {
        let postResponse = await request.post('/genre')
            .send({
                name: 'test',
            })
            .expect(201);
        console.log(postResponse.body);

        let response = await request.get('/genres')
            .expect(200);
        console.log(response.body);
    });
});
