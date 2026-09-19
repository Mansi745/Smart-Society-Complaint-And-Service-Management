# ---- Build stage: uses Maven image, so .mvn / mvnw are not needed ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:21-jdk
WORKDIR /app

# TiDB Cloud CA certificate
COPY cert/ca.pem /tmp/ca.pem
RUN keytool -importcert -noprompt \
    -trustcacerts \
    -alias tidb-ca \
    -file /tmp/ca.pem \
    -keystore $JAVA_HOME/lib/security/cacerts \
    -storepass changeit

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082
CMD ["java", "-jar", "app.jar"]
