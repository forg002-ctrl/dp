install-base:
	cp .example.env .env
	cp ./backend/.example.env ./backend/.env
	docker network create microservices-net | :

install-backend:
	docker-compose run --rm backend "npm install"

install-frontend:
	docker-compose run --rm frontend "npm install"

install-fs_srv:
	docker-compose run --rm fs_srv "npm install"

install:
	install-base install-backend install-frontend install-fs_srv

start:
	docker-compose up --remove-orphans -d backend frontend fs_srv database minio

stop:
	docker-compose stop