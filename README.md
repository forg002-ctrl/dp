This is a [Node.js](https://nodejs.org/en/) project, which was made using [Express](https://expressjs.com/) framework and [Sequlize](https://sequelize.org/) on Backend and [React](https://react.dev/) with [Tailwind.CSS](https://tailwindcss.com/) on frontend.
## Getting Started

First, setup necessary environment:

```bash
make install
```

Now you can run the project:

```bash
make start
```

Stop the project:

```bash
make stop
```


API documentation:

1) Backend
    ```bash
    http://localhost:3001/swagger
    ```
2) File System Service
    ```bash
    http://localhost:3003/swagger
    ```

Frontend Roots:
1) Books List
    ```bash
    http://localhost:3002/books
    ```
2) Book Creation
    ```bash
    http://localhost:3002/book
    ```
3) Book's Detail Page
    ```bash
    http://localhost:3002/book/:id_book
    ```