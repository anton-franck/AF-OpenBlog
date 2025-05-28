include .env
UNAME := $(shell uname)

# develop
update: update-docker install-strapi db-dump-apply dump-public-apply up
up: up-develop
apply-force: db-dump-apply-force dump-public-apply-force

# production
production-update: update-docker install-strapi production-up production-restart-strapi

# contexts for production and develop
install-env:
	touch .env
	grep -q "^# General" .env  || echo "# General" >> .env
	grep -q "^COMPOSE_PROJECT_NAME=" .env  || echo "COMPOSE_PROJECT_NAME=\"\"" >> .env
	grep -q "^DATABASE_ROOT_PASSWORD=" .env  || echo "DATABASE_ROOT_PASSWORD=\"\"" >> .env

	grep -q "^# Strapi System" .env  || echo "\n# Strapi System" >> .env
	grep -q "^STRAPI_NODE_ENV=" .env  || echo "STRAPI_NODE_ENV=\"develop\"" >> .env
	grep -q "^STRAPI_EXEC_COMMAND=" .env  || echo "STRAPI_EXEC_COMMAND=\"develop\" # develop for development; start for production" >> .env
	grep -q "^STRAPI_HOST=" .env  || echo "STRAPI_HOST=\"0.0.0.0\"" >> .env
	grep -q "^STRAPI_PORT=" .env  || echo "STRAPI_PORT=1337" >> .env
	grep -q "^STRAPI_DEVELOP_DOCKER_PORT=" .env  || echo "STRAPI_DEVELOP_DOCKER_PORT=1337:1337" >> .env

	grep -q "^# Strapi Database" .env  || echo "\n# Strapi Database" >> .env
	grep -q "^STRAPI_DATABASE_CLIENT=" .env  || echo "STRAPI_DATABASE_CLIENT=\"mysql\"" >> .env
	grep -q "^STRAPI_DATABASE_HOST=" .env  || echo "STRAPI_DATABASE_HOST=\"-mariadb\"" >> .env
	grep -q "^STRAPI_DATABASE_PORT=" .env  || echo "STRAPI_DATABASE_PORT=\"3306\"" >> .env
	grep -q "^STRAPI_DATABASE_NAME=" .env  || echo "STRAPI_DATABASE_NAME=\"strapi\"" >> .env
	grep -q "^STRAPI_DATABASE_USERNAME=" .env  || echo "STRAPI_DATABASE_USERNAME=\"strapi\"" >> .env
	grep -q "^STRAPI_DATABASE_PASSWORD=" .env  || echo "STRAPI_DATABASE_PASSWORD=\"\"" >> .env

	grep -q "^# Strapi Keys" .env  || echo "\n# Strapi Keys" >> .env
	grep -q "^STRAPI_JWT_SECRET=" .env  || echo "STRAPI_JWT_SECRET=\"\"" >> .env
	grep -q "^STRAPI_ADMIN_JWT_SECRET=" .env  || echo "STRAPI_ADMIN_JWT_SECRET=\"\"" >> .env
	grep -q "^STRAPI_APP_KEYS=" .env  || echo "STRAPI_APP_KEYS=\"\"" >> .env
	grep -q "^STRAPI_API_TOKEN_SALT=" .env  || echo "STRAPI_API_TOKEN_SALT=\"\"" >> .env
	grep -q "^STRAPI_TRANSFER_TOKEN_SALT=" .env  || echo "STRAPI_TRANSFER_TOKEN_SALT=\"\"" >> .env

install-strapi:

	if [ ! -d "strapi/app" ] || [ $$(ls -A "strapi/app" | wc -l) -eq 0 ]; then \
		docker compose run -it --rm strapi npx create-strapi-app@latest "../app" --quickstart; \
		docker compose run -it --rm strapi npm install mysql2 --save; \
	fi
	docker compose run -i --rm strapi npm ci
	if [ ${STRAPI_EXEC_COMMAND} = "start" ]; then \
		docker compose run -i --rm strapi npm run build; \
	fi

log:
	docker compose logs -f -n 10

down:
	docker compose down

shell:
	docker compose run -it --rm strapi sh

# contexts for develop
update-docker:
	docker compose pull
	docker compose build --pull

up-develop:
	docker compose -f docker-compose.yml -f docker-compose.develop.yml up -d

# contexts for production
production-up:
	docker compose up -d
	
production-restart-strapi:
	docker compose restart strapi