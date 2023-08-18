import { request } from '@src/test/start';

import { IResponseBody as IPostResponseBody, IRequestBody } from '@src/ext/shared/services/backend/routes/genre/PostRouteDescription';
import { IResponseBody as IListResponseBody } from '@src/ext/shared/services/backend/routes/genres/GetRouteDescription';
import { IResponseBody as IGetResponseBody } from '@src/ext/shared/services/backend/routes/genre/GetRouteDescription';
import { IResponseBody as IDeleteResponseBody } from '@src/ext/shared/services/backend/routes/genre/DeleteRouteDescription';

let id_genre: number | null = null;
const genre_mock: IRequestBody = {
    name: 'test-name',
};

describe('[POST] /genre Route testing', () => {
    it('Should create genre without any error', async () => {
        let response = await request
            .post('/genre')
            .send(genre_mock)
            .expect(201);

        let responseBody: IPostResponseBody = {
            id_genre: response.body.id_genre,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_genre).toBeTruthy();

        id_genre = responseBody.id_genre;
    });

    it('Should not create genre with same name', async () => {
        await request
            .post('/genre')
            .send(genre_mock)
            .expect(400, { error: 'Genre with such name already exists' });
    });

    it('Should not create genre, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /genres Route testing', () => {
    it('Should list all genres(1) without any errors', async () => {
        let response = await request
            .get('/genres')
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(1);

        expect(responseBody.rows[0].id_genre).toStrictEqual(id_genre);
        expect(responseBody.rows[0].name).toStrictEqual(genre_mock.name);
    });

    it('Should list no genres(0) without any errors with "bad" search word', async () => {
        let response = await request
            .get('/genres?search=search-word')
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(0);
    });

    it('Should list all genres(1) without any errors with "good" search word', async () => {
        let response = await request
            .get(`/genres?search=${genre_mock.name}`)
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(1);
    });

    it('Should not list genres, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /genre/:id_genre', () => {
    it('Should get the genre by id_genre without any errors', async () => {
        let response = await request
            .get(`/genre/${id_genre}`)
            .expect(200);

        let responseBody: IGetResponseBody = {
            id_genre: response.body.id_genre,
            name: response.body.name,
            booksCount: response.body.booksCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_genre).toStrictEqual(id_genre);
    });

    it('Should not get the genre, because of non-existing genre', async () => {
        await request
            .get(`/genre/0`)
            .expect(404);
    });

    it('Should not get the genre, because of "wrong" id_genre', async () => {
        await request
            .get(`/genre/non-id_genre`)
            .expect(500);
    });

    it('Should not get genre, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[DELETE] /genre/:id_genre', () => {
    it('Should delete the genre by id_genre without any errors', async () => {
        let response = await request
            .delete(`/genre/${id_genre}`)
            .expect(200);

        let responseBody: IDeleteResponseBody = {
            removedBooks: response.body.removedBooks,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.removedBooks).toStrictEqual(0);

        let listResponse = await request
            .get('/genres')
            .expect(200);

        let listResponseBody: IListResponseBody = {
            rows: listResponse.body.rows,
            rowsCount: listResponse.body.rowsCount,
        };

        expect(listResponseBody).toStrictEqual(listResponse.body);
        expect(listResponseBody.rowsCount).toStrictEqual(0);
    });

    it('Should not delete the non-exisitng genre', async () => {
        await request
            .delete(`/genre/0`)
            .expect(404);
    });

    it('Should not delete the genre, because of "wrong" id_genre', async () => {
        await request
            .delete(`/genre/non-id_genre`)
            .expect(500);
    });

    it('Should not delete genre, because of anauthorized(TODO)', async () => {
        //
    });
});
