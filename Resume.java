import java.util.*;

public class Resume {

    String name;

    String content;

    List<String> tokens =
            new ArrayList<>();

    Map<String, Integer> termFreq =
            new HashMap<>();

    Set<String> stopwords =
            Set.of(
                    "the",
                    "is",
                    "and",
                    "a",
                    "an",
                    "of",
                    "to",
                    "in",
                    "for",
                    "with",
                    "on",
                    "by"
            );

    double score;

    public Resume(
            String name,
            String text) {

        this.name = name;

        this.content = text;

        if (text == null) {
            text = "";
        }

        text =
                text.toLowerCase()
                        .replaceAll(
                                "[^a-zA-Z0-9\\s]",
                                " "
                        );

        String[] parts =
                text.split("\\s+");

        for (String p : parts) {

            if (stopwords.contains(p))
                continue;

            tokens.add(p);

            termFreq.put(
                    p,
                    termFreq.getOrDefault(p, 0) + 1
            );
        }
    }

    public Map<String, Integer> getTermFreq() {
        return termFreq;
    }

    public List<String> getTokens() {
        return tokens;
    }
}