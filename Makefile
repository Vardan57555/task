PROJECT_NAME=combinations
DOCKER_COMPOSE=docker-compose
COMPOSE_FILE=docker-compose.yml

start:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) up --build -d

stop:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down

restart:
	$(MAKE) stop
	$(MAKE) start

logs:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) logs -f

ps:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) ps

clean:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down -v --remove-orphans
