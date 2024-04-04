docker stop pinmap-server pinmap-database
docker rm pinmap-server pinmap-database
docker rmi pinmap-database
docker rmi pinmap-server
docker network rm pinmap-network
docker network create pinmap-network
docker build -f dockerfiles/local.database.Dockerfile -t pinmap-database .
docker run --network pinmap-network --name pinmap-database -p 6000:3306 -d pinmap-database
docker build -f dockerfiles/local.Dockerfile -t pinmap-server .
docker run --network pinmap-network --name pinmap-server -p 4000:3000 -d pinmap-server
