import { request } from '@src/test/start';

import { IResponseBody as IPostResponseBody, IRequestBody } from '@src/ext/shared/services/backend/routes/author/PostRouteDescription';
import { IResponseBody as IListResponseBody } from '@src/ext/shared/services/backend/routes/authors/GetRouteDescription';
import { IResponseBody as IGetResponseBody } from '@src/ext/shared/services/backend/routes/author/GetRouteDescription';
import { IResponseBody as IDeleteResponseBody } from '@src/ext/shared/services/backend/routes/author/DeleteRouteDescription';

let id_author: string | null = null;
const author_mock: IRequestBody = {
    firstname: 'test-firstname',
    lastname: 'test-lastname',
    birthdate: '01/01/1970',
    info: 'test-name',
};

describe('[POST] /author Route testing', () => {
    it('Should create author without any error', async () => {
        let response = await request
            .post('/author')
            .send(author_mock)
            .expect(201);

        let responseBody: IPostResponseBody = {
            id_author: response.body.id_author,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_author).toBeTruthy();

        id_author = responseBody.id_author;
    });

    it('Should not create author, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /authors Route testing', () => {
    it('Should list all authors(1) without any errors', async () => {
        let response = await request
            .get('/authors')
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(1);

        expect(responseBody.rows[0].id_author).toStrictEqual(id_author);
        expect(responseBody.rows[0].firstname).toStrictEqual(author_mock.firstname);
        expect(responseBody.rows[0].lastname).toStrictEqual(author_mock.lastname);
    });

    it('Should not list authors, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /author/:id_author', () => {
    it('Should get the author by id_author without any errors', async () => {
        let response = await request
            .get(`/author/${id_author}`)
            .expect(200);

        let responseBody: IGetResponseBody = {
            id_author: response.body.id_author,
            firstname: response.body.firstname,
            lastname: response.body.lastname,
            birthdate: response.body.birthdate,
            info: response.body.info,
            booksCount: response.body.booksCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_author).toStrictEqual(id_author);
        expect(responseBody.firstname).toStrictEqual(author_mock.firstname);
        expect(responseBody.lastname).toStrictEqual(author_mock.lastname);
        expect(responseBody.birthdate).toStrictEqual(author_mock.birthdate);
        expect(responseBody.info).toStrictEqual(author_mock.info);
    });

    it('Should not get the author, because of non-existing author', async () => {
        await request
            .get(`/author/0`)
            .expect(404);
    });

    it('Should not get the author, because of "wrong" id_author', async () => {
        await request
            .get(`/author/non-id_author`)
            .expect(500);
    });

    it('Should not get author, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[DELETE] /author/:id_author', () => {
    it('Should delete the author by id_author without any errors', async () => {
        let response = await request
            .delete(`/author/${id_author}`)
            .expect(200);

        let responseBody: IDeleteResponseBody = {
            removedBooks: response.body.removedBooks,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.removedBooks).toStrictEqual(0);

        let listResponse = await request
            .get('/authors')
            .expect(200);

        let listResponseBody: IListResponseBody = {
            rows: listResponse.body.rows,
            rowsCount: listResponse.body.rowsCount,
        };

        expect(listResponseBody).toStrictEqual(listResponse.body);
        expect(listResponseBody.rowsCount).toStrictEqual(0);
    });

    it('Should not delete the non-exisitng author', async () => {
        await request
            .delete(`/author/0`)
            .expect(404);
    });

    it('Should not delete the author, because of "wrong" id_author', async () => {
        await request
            .delete(`/author/non-id_author`)
            .expect(500);
    });

    it('Should not delete author, because of anauthorized(TODO)', async () => {
        //
    });
});
