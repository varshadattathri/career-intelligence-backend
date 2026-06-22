FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY src ./src

RUN javac \
src/MainServer.java \
src/UserStore.java \
src/ResumeStore.java

EXPOSE 10000

CMD ["java","-cp","src","MainServer"]