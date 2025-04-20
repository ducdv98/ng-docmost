# Postgres

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```


# Redis

```bash
docker run -d --name redis-stack -p 6379:6379 -e REDIS_ARGS="--requirepass mypassword" redis/redis-stack-server:latest

```

