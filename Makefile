dev-run:
	docker compose up api-dev mongo

dev-build:
	docker compose up --build api-dev mongo

debug-build:
	docker compose up --build api-debug mongo

debug-run:
	docker compose up api-debug mongo

down:
	docker compose down -v