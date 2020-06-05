build:
	docker-compose build

up:
	make up $(args)

up.detach:
	docker-compose up --detach --force-recreate --renew-anon-volumes --remove-orphans $(args)

up.firebase:
	docker-compose up --detach idvogados_firebase

down:
	docker-compose down $(args)

down.volumes:
	docker-compose down --volumes

bash:
	docker-compose run idvogados_api bash

cli:
	docker-compose run idvogados_api npm run cli

tests:
	docker-compose run idvogados_api npm run test

coverage:
	docker-compose run idvogados_api npm run coverage

style.check:
	docker-compose run idvogados_api npm run style:check