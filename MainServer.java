import com.sun.net.httpserver.*;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class MainServer {

    public static void main(String[] args)
            throws Exception {

        HttpServer server =
                HttpServer.create(
                        new InetSocketAddress(8080),
                        0
                );

        server.createContext("/register",
                new RegisterHandler());

        server.createContext("/login",
                new LoginHandler());

        server.createContext("/analyze",
                new AnalyzeHandler());

        server.start();

        System.out.println(
                "Server running at localhost:8080"
        );
    }

    static class RegisterHandler
            implements HttpHandler {

        public void handle(HttpExchange ex)
                throws IOException {

            String body =
                    new String(
                            ex.getRequestBody()
                                    .readAllBytes()
                    );

            String[] d = body.split("###");

            try {

                boolean ok =
                        UserStore.register(d[0], d[1]);

                String r = ok
                        ? "REGISTERED"
                        : "USER EXISTS";

                ex.sendResponseHeaders(200, r.length());

                ex.getResponseBody()
                        .write(r.getBytes());

                ex.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    static class LoginHandler
            implements HttpHandler {

        public void handle(HttpExchange ex)
                throws IOException {

            String body =
                    new String(
                            ex.getRequestBody()
                                    .readAllBytes()
                    );

            String[] d = body.split("###");

            try {

                boolean ok =
                        UserStore.login(d[0], d[1]);

                String r =
                        ok ? "SUCCESS" : "FAIL";

                ex.sendResponseHeaders(200, r.length());

                ex.getResponseBody()
                        .write(r.getBytes());

                ex.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    static class AnalyzeHandler
            implements HttpHandler {

        public void handle(HttpExchange ex)
                throws IOException {

            String body =
                    new String(
                            ex.getRequestBody()
                                    .readAllBytes()
                    );

            String[] d = body.split("###");

            String user = d[0];
            String jd = d[1];
            String resume = d[2];

            try {

                ResumeStore.saveResume(user, resume);

                int score = 85;

                List<String> missing =
                        Arrays.asList("AWS", "Spring");

                List<String> questions =
                        Arrays.asList(
                                "Explain Java collections",
                                "What is Spring Boot?",
                                "Explain REST API"
                        );

                List<String> all =
                        ResumeStore.getAllResumes();

                int rank = all.size();

                String json =
                        "{"
                        + "\"score\":" + score + ","
                        + "\"rank\":" + rank + ","
                        + "\"explanation\":\"Strong Java skills\","
                        + "\"missing\":[\"AWS\",\"Spring\"],"
                        + "\"questions\":["
                        + "\"Explain Java collections\","
                        + "\"What is Spring Boot?\","
                        + "\"Explain REST API\""
                        + "]"
                        + "}";

                ex.getResponseHeaders()
                        .add(
                                "Access-Control-Allow-Origin",
                                "*"
                        );

                ex.sendResponseHeaders(
                        200,
                        json.length()
                );

                ex.getResponseBody()
                        .write(json.getBytes());

                ex.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}