#!/bin/bash

git clone https://github.com/anton-franck/AF-CMSNEXT-Blog.git

cd AF-CMSNEXT-Blog
git switch add-script

read -p "Wie heißt dein Blog? " BLOG_NAME
read -sp "Datenbank Root-Passwort: " DATABASE_ROOT_PASSWORD && echo
read -sp "Datenbank Benutzer-Passwort: " STRAPI_DATABASE_PASSWORD && echo

STRAPI_JWT_SECRET=$(openssl rand -base64 32)
STRAPI_ADMIN_JWT_SECRET=$(openssl rand -base64 32)
STRAPI_APP_KEYS=$(openssl rand -base64 64 | tr -d '\n')
STRAPI_API_TOKEN_SALT=$(openssl rand -base64 32)
STRAPI_TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)

touch .env
	grep -q "^# General" .env  || echo "# General" >> .env
	grep -q "^COMPOSE_PROJECT_NAME=" .env  || echo "COMPOSE_PROJECT_NAME=\"$BLOG_NAME\"" >> .env
	grep -q "^DATABASE_ROOT_PASSWORD=" .env  || echo "DATABASE_ROOT_PASSWORD=\"$DATABASE_ROOT_PASSWORD\"" >> .env

	grep -q "^# Strapi System" .env  || echo "# Strapi System" >> .env
	grep -q "^STRAPI_NODE_ENV=" .env  || echo "STRAPI_NODE_ENV=\"production\"" >> .env
	grep -q "^STRAPI_EXEC_COMMAND=" .env  || echo "STRAPI_EXEC_COMMAND=\"start\"" >> .env
	grep -q "^STRAPI_HOST=" .env  || echo "STRAPI_HOST=\"0.0.0.0\"" >> .env
	grep -q "^STRAPI_PORT=" .env  || echo "STRAPI_PORT=1337" >> .env
	grep -q "^STRAPI_DEVELOP_DOCKER_PORT=" .env  || echo "STRAPI_DEVELOP_DOCKER_PORT=1338:1337" >> .env

	grep -q "^# Strapi Database" .env  || echo "# Strapi Database" >> .env
	grep -q "^STRAPI_DATABASE_CLIENT=" .env  || echo "STRAPI_DATABASE_CLIENT=\"mysql\"" >> .env
	grep -q "^STRAPI_DATABASE_HOST=" .env  || echo "STRAPI_DATABASE_HOST=\"-mariadb\"" >> .env
	grep -q "^STRAPI_DATABASE_PORT=" .env  || echo "STRAPI_DATABASE_PORT=\"3306\"" >> .env
	grep -q "^STRAPI_DATABASE_NAME=" .env  || echo "STRAPI_DATABASE_NAME=\"strapi\"" >> .env
	grep -q "^STRAPI_DATABASE_USERNAME=" .env  || echo "STRAPI_DATABASE_USERNAME=\"strapi\"" >> .env
	grep -q "^STRAPI_DATABASE_PASSWORD=" .env  || echo "STRAPI_DATABASE_PASSWORD=\"$STRAPI_DATABASE_PASSWORD\"" >> .env

	grep -q "^# Strapi Keys" .env  || echo "# Strapi Keys" >> .env
	grep -q "^STRAPI_JWT_SECRET=" .env  || echo "STRAPI_JWT_SECRET=\"$STRAPI_JWT_SECRET\"" >> .env
	grep -q "^STRAPI_APP_KEYS=" .env  || echo "STRAPI_APP_KEYS=\"$STRAPI_APP_KEYS\"" >> .env
    grep -q "^STRAPI_ADMIN_JWT_SECRET=" .env  || echo "STRAPI_ADMIN_JWT_SECRET=\"$STRAPI_ADMIN_JWT_SECRET\"" >> .env
	grep -q "^STRAPI_API_TOKEN_SALT=" .env  || echo "STRAPI_API_TOKEN_SALT=\"$STRAPI_API_TOKEN_SALT\"" >> .env
	grep -q "^STRAPI_TRANSFER_TOKEN_SALT=" .env  || echo "STRAPI_TRANSFER_TOKEN_SALT=\"$STRAPI_TRANSFER_TOKEN_SALT\"" >> .env
	grep -q "^# Frontend Configuration" .env  || echo "\n# Frontend Configuration" >> .env
	grep -q "^FRONTEND_PORT=" .env  || echo "FRONTEND_PORT=80:3000" >> .env
	grep -q "^STRAPI_URL=" .env  || echo "STRAPI_URL=\"http://strapi:1337\"" >> .env
    grep -q "^STRAPI_API_KEY=" .env  || echo "STRAPI_API_KEY=\"\"" >> .env

make update