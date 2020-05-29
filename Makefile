all: 
	make up
build:
	docker-compose --build
up: 
	docker-compose up --detach --force-recreate --renew-anon-volumes --remove-orphans