install-base:
	cp .example.env .env
	docker network create tasknet | :

install-backend:
	docker-compose run --rm backend "npm install"

install-frontend:
	docker-compose run --rm frontend "npm install"

install-fs_srv:
	docker-compose run --rm fs_srv "npm install"

install: install-base install-backend install-frontend

start:
	docker-compose up --remove-orphans -d database backend frontend minio fs_srv

stop:
	docker-compose stop