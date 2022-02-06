FROM openjdk:17 as build

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
RUN chmod 700 app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]