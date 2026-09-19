FROM eclipse-temurin:21-jdk

WORKDIR /app

# TiDB Cloud CA certificate
COPY cert/ca.pem /tmp/ca.pem

# Add TiDB CA certificate to Java truststore
RUN keytool -importcert -noprompt \
    -trustcacerts \
    -alias tidb-ca \
    -file /tmp/ca.pem \
    -keystore $JAVA_HOME/lib/security/cacerts \
    -storepass changeit

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -jar target/*.jar"]