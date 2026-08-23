package com.modbapi.examples;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public final class ChatCompletion {
    private ChatCompletion() {}

    private static String required(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank() || value.startsWith("replace-") || value.startsWith("sk-your")) {
            throw new IllegalStateException("Set " + name + " before running this example.");
        }
        return value.trim();
    }

    public static void main(String[] args) throws Exception {
        String apiKey = required("MODB_API_KEY");
        String baseUrl = System.getenv().getOrDefault("MODB_BASE_URL", "https://modbapi.com/v1").replaceAll("/+$", "");
        String model = required("MODB_MODEL");
        int timeoutSeconds = Integer.parseInt(System.getenv().getOrDefault("MODB_TIMEOUT_SECONDS", "30"));
        String body = "{\"model\":\"" + escape(model) + "\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with one short greeting.\"}],\"stream\":false,\"max_tokens\":64}";

        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(timeoutSeconds))
                .build();
        HttpRequest request = HttpRequest.newBuilder(URI.create(baseUrl + "/chat/completions"))
                .timeout(Duration.ofSeconds(timeoutSeconds))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("HTTP " + response.statusCode());
        System.out.println(response.body());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IllegalStateException("The API request failed with HTTP " + response.statusCode());
        }
    }

    private static String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
