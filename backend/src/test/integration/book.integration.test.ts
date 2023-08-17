import { request } from '@src/test/start';

import { TestSDK, SDK } from '@src/ext/sdk/backend';
import { IRemoteResponse } from '@src/ext/sdk/backend/remoteService/RemoteService';
import { RemoteServiceMock } from '@src/ext/sdk/backend/remoteService/RemoteServiceMock';

import { IResponseBody as IPostResponseFileBody } from '@src/ext/shared/services/fs_srv/routes/file/PostRouteDescription';
import { IResponseBody as IDeleteResponseFileBody } from '@src/ext/shared/services/fs_srv/routes/file/DeleteRouteDescription';
import { IRequestBody as IPostRequestAuthorBody, IResponseBody as IPostResponseAuthorBody } from '@src/ext/shared/services/backend/routes/author/PostRouteDescription';
import { IRequestBody as IPostRequestGenreBody, IResponseBody as IPostResponseGenreBody } from '@src/ext/shared/services/backend/routes/genre/PostRouteDescription';

import { IResponseBody as IPostResponseBody, IRequestBody } from '@src/ext/shared/services/backend/routes/book/PostRouteDescription';
import { IResponseBody as IListResponseBody } from '@src/ext/shared/services/backend/routes/books/GetRouteDescription';
import { IResponseBody as IGetResponseBody } from '@src/ext/shared/services/backend/routes/book/GetRouteDescription';
import { IResponseBody as IDeleteResponseBody } from '@src/ext/shared/services/backend/routes/book/DeleteRouteDescription';

beforeAll(async (): Promise<void> => {
    (<TestSDK>SDK.GetInstance()).setRemoteService(new RemoteServiceMock(
        {
            serviceName: 'fs_srv',
        },
        async (method: string, path: string): Promise<any> => {
            if (method === 'POST' && path === '/file') {
                return <IRemoteResponse>{
                    status: 201,
                    async json(): Promise<IPostResponseFileBody> {
                        return {
                            uid_file: '1',
                        };
                    },
                };
            } else if (method === 'DELETE') { //TODO: add regex
                return <IRemoteResponse>{
                    status: 200,
                    async json(): Promise<IDeleteResponseFileBody> {
                        return {
                            success: true,
                        };
                    },
                };
            } else {
                return <IRemoteResponse>{
                    status: 500,
                    async json(): Promise<any> {
                        return {
                            error: 'RemoteServiceMock Route not found',
                        };
                    },
                };
            }
        },
    ));

    await generateAuthor();
    await generateGenre();
});

afterAll((): void => {
    (<TestSDK>SDK.GetInstance()).resetRemoteServices();
});

let id_author: string | null = null;
let id_genre: string | null = null;

const getAuthorMock = (): IPostRequestAuthorBody => {
    return {
        firstname: 'test-firstname',
        lastname: 'test-lastname',
        birthdate: '01/01/1970',
        info: 'test-name',
    };
};
const getGenreMock = (): IPostRequestGenreBody => {
    return {
        name: 'test-name',
    };
};

const generateAuthor = async (): Promise<void> => {
    let mockData = getAuthorMock();

    let response = await request
        .post('/author')
        .send(mockData)
        .expect(201);

    let responseBody: IPostResponseAuthorBody = {
        id_author: response.body.id_author,
    };

    expect(responseBody).toStrictEqual(response.body);
    expect(responseBody.id_author).toBeTruthy();

    id_author = responseBody.id_author;
};
const generateGenre = async (): Promise<void> => {
    let mockData = getGenreMock();

    let response = await request
        .post('/genre')
        .send(mockData)
        .expect(201);

    let responseBody: IPostResponseGenreBody = {
        id_genre: response.body.id_genre,
    };

    expect(responseBody).toStrictEqual(response.body);
    expect(responseBody.id_genre).toBeTruthy();

    id_genre = responseBody.id_genre;
};

let id_book: string | null = null;
const getBookMock = (): IRequestBody => {
    return {
        id_genre: id_genre as string,
        id_author: id_author as string,
        title: 'test-title',
        price: 10,
        info: 'test-info',
    };
};

describe('[POST] /book Route testing', () => {
    it('Should create book without any error', async () => {
        let mockData = getBookMock();

        let buffer = Buffer.from('some data');

        let response = await request
            .post('/book')
            .attach('file', buffer, 'mock_file.txt')
            .field('id_genre', mockData.id_genre)
            .field('id_author', mockData.id_author)
            .field('title', mockData.title)
            .field('price', mockData.price)
            .field('info', mockData.info)
            .expect(201);

        let responseBody: IPostResponseBody = {
            id_book: response.body.id_book,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_book).toBeTruthy();

        id_book = responseBody.id_book;
    });

    it('Should not create book, because of non-existing genre', async () => {
        let mockData = getBookMock();

        let buffer = Buffer.from('some data');

        await request
            .post('/book')
            .attach('file', buffer, 'mock_file.txt')
            .field('id_genre', 0)
            .field('id_author', mockData.id_author)
            .field('title', mockData.title)
            .field('price', mockData.price)
            .field('info', mockData.info)
            .expect(404);
    });

    it('Should not create book, because of non-existing author', async () => {
        let mockData = getBookMock();

        let buffer = Buffer.from('some data');

        await request
            .post('/book')
            .attach('file', buffer, 'mock_file.txt')
            .field('id_genre', mockData.id_genre)
            .field('id_author', 0)
            .field('title', mockData.title)
            .field('price', mockData.price)
            .field('info', mockData.info)
            .expect(404);
    });

    it('Should not create book, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /books Route testing', () => {
    it('Should list all books(1) without any errors', async () => {
        let response = await request
            .get('/books')
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(1);

        let authorMockData = getAuthorMock();
        let genreMockData = getGenreMock();
        let mockData = getBookMock();

        expect(responseBody.rows[0].id_book).toStrictEqual(id_book);
        expect(responseBody.rows[0].id_genre).toStrictEqual(id_genre);
        expect(responseBody.rows[0].id_author).toStrictEqual(id_author);
        expect(responseBody.rows[0].author_fullname).toStrictEqual(`${authorMockData.firstname} ${authorMockData.lastname}`);
        expect(responseBody.rows[0].genre_name).toStrictEqual(genreMockData.name);
        expect(responseBody.rows[0].title).toStrictEqual(mockData.title);
        expect(responseBody.rows[0].price).toStrictEqual(mockData.price);
        expect(responseBody.rows[0].uid_file).toBeTruthy();
    });

    it('Should list no books(0) without any errors with "bad" search word', async () => {
        let response = await request
            .get('/books?search=search-word')
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(0);
    });

    it('Should list all books(1) without any errors with "good" search word', async () => {
        let mockData = getBookMock();

        let response = await request
            .get(`/books?search=${mockData.title}`)
            .expect(200);

        let responseBody: IListResponseBody = {
            rows: response.body.rows,
            rowsCount: response.body.rowsCount,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.rowsCount).toStrictEqual(1);
    });

    it('Should not list books, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[GET] /book/:id_book', () => {
    it('Should get the book by id_book without any errors', async () => {
        let response = await request
            .get(`/book/${id_book}`)
            .expect(200);

        let responseBody: IGetResponseBody = {
            id_book: response.body.id_book,
            id_author: response.body.id_author,
            id_genre: response.body.id_genre,
            author_fullname: response.body.author_fullname,
            genre_name: response.body.genre_name,
            title: response.body.title,
            price: response.body.price,
            uid_file: response.body.uid_file,
            info: response.body.info,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.id_book).toStrictEqual(id_book);
    });

    it('Should not get the book, because of non-existing book', async () => {
        await request
            .get(`/book/0`)
            .expect(404);
    });

    it('Should not get the book, because of "wrong" id_book', async () => {
        await request
            .get(`/book/non-id_book`)
            .expect(500);
    });

    it('Should not get book, because of anauthorized(TODO)', async () => {
        //
    });
});

describe('[DELETE] /book/:id_book', () => {
    it('Should delete the book by id_book without any errors', async () => {
        let response = await request
            .delete(`/book/${id_book}`)
            .expect(200);

        let responseBody: IDeleteResponseBody = {
            success: response.body.success,
        };

        expect(responseBody).toStrictEqual(response.body);
        expect(responseBody.success).toStrictEqual(true);

        let listResponse = await request
            .get('/books')
            .expect(200);

        let listResponseBody: IListResponseBody = {
            rows: listResponse.body.rows,
            rowsCount: listResponse.body.rowsCount,
        };

        expect(listResponseBody).toStrictEqual(listResponse.body);
        expect(listResponseBody.rowsCount).toStrictEqual(0);
    });

    it('Should not delete the non-exisitng book', async () => {
        await request
            .delete(`/book/0`)
            .expect(404);
    });

    it('Should not delete the book, because of "wrong" id_book', async () => {
        await request
            .delete(`/book/non-id_book`)
            .expect(500);
    });

    it('Should not delete book, because of anauthorized(TODO)', async () => {
        //
    });
});
