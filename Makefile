all: 
	make up
build:
	docker-compose build
up: 
	docker-compose up --detach --force-recreate --renew-anon-volumes --remove-orphans

up.firebase:
	docker-compose up --detach idvogados_firebase

down:
	docker-compose down

bash:
	docker-compose run idvogados_api bash

tests:
	docker-compose run idvogados_api npm run test

coverage:
	docker-compose run idvogados_api npm run coverage

style.check:
	docker-compose run idvogados_api npm run style:check