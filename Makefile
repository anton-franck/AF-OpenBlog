include .env
UNAME := $(shell uname)

update:	update-docker install-strapi install-frontend
up:	up-production

# production
production-update: update-docker install-strapi  production-up production-restart-strapi
up-production: production-up
frontend-update: update-docker install-frontend
strapi-update: update-docker install-strapi

install-strapi:

	if [ ! -d "strapi/app" ] || [ $$(ls -A "strapi/app" | wc -l) -eq 0 ]; then \
		docker compose run -it --rm strapi npx create-strapi-app@latest "../app" --quickstart; \
		docker compose run -it --rm strapi npm install mysql2 --save; \
	fi
	docker compose run -i --rm strapi npm ci
	if [ ${STRAPI_EXEC_COMMAND} = "start" ]; then \
		docker compose run -i --rm strapi npm run build; \
	fi

install-frontend:
	if [ ! -d "blog-frontend/node_modules" ]; then \
		docker compose run -i --rm frontend npm ci; \
	fi

log:
	docker compose logs -f -n 10

down:
	docker compose down

shell-strapi:
	docker compose run -it --rm strapi sh

shell-frontend:
	docker compose run -it --rm frontend sh

update-docker:
	docker compose pull
	docker compose build --pull

up-develop:
	docker compose -f docker-compose.yml -f docker-compose.develop.yml up -d

production-up:
	docker compose up -d

up-strapi-db:
	docker compose -f docker-compose.yml -f docker-compose.develop.yml up -d strapi strapi-mariadb

production-restart:
	docker compose restart strapi frontend