# t-learn project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```
./mvnw quarkus:dev
```

## Build Docker image

```
./mvnw clean package -Dquarkus.container-image.build=true
```

## Running a local Postgres server in a Docker container with Volume

```
docker-compose up postgres

```

## Running a local Postgres server in a Docker container (no state)

```
docker run -d --rm --name postgres-quarkus-hibernate -e POSTGRES_USER=t-learn -e POSTGRES_PASSWORD=t-learn -e POSTGRES_DB=t_learn_db -p 5432:5432 postgres:13
```

## Frontend SPA

This application also contains the frontend SPA part in the folder `src/main/webapp`.
It has its own [README.md](src/main/webapp/README.md) in the same folder.

## Packaging and running the application

The application can be packaged using `./mvnw package`, this also compiles a minified production version
of the SPA web frontend and puts it in the folder where Quarkus expects the static web content.
Maven produces the `t-learn-1.0.0-SNAPSHOT-runner.jar` file in the `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/t-learn-1.0.0-SNAPSHOT-runner.jar`.

## Creating a native executable

You can create a native executable using: `./mvnw package -Pnative`.

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: `./mvnw package -Pnative -Dquarkus.native.container-build=true`.

You can then execute your native executable with: `./target/t-learn-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/building-native-image.
