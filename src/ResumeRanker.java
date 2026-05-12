import java.util.*;

public class ResumeRanker {

    JobDescription jd;

    List<Resume> resumes =
            new ArrayList<>();

    public ResumeRanker(
            JobDescription jd) {

        this.jd = jd;
    }

    public void addResume(Resume r) {

        r.score =
                cosineSimilarity(
                        jd.getTermFreq(),
                        r.getTermFreq()
                );

        resumes.add(r);
    }

    public List<Resume> rank() {

        resumes.sort(
                (a, b) ->
                        Double.compare(
                                b.score,
                                a.score
                        )
        );

        return resumes;
    }

    private double cosineSimilarity(
            Map<String, Integer> a,
            Map<String, Integer> b) {

        Set<String> words =
                new HashSet<>();

        words.addAll(a.keySet());

        words.addAll(b.keySet());

        double dot = 0;

        double na = 0;

        double nb = 0;

        for (String w : words) {

            int x =
                    a.getOrDefault(w, 0);

            int y =
                    b.getOrDefault(w, 0);

            dot += x * y;

            na += x * x;

            nb += y * y;
        }

        if (na == 0 || nb == 0)
            return 0;

        return dot /
                (
                        Math.sqrt(na)
                                * Math.sqrt(nb)
                );
    }

    public List<String> getMissingSkills(
            Resume r) {

        List<String> missing =
                new ArrayList<>();

        for (String s : jd.getTokens()) {

            if (!r.getTokens().contains(s)) {

                missing.add(s);
            }
        }

        return missing;
    }

    public List<String> generateQuestions(
            Resume r) {

        List<String> qs =
                new ArrayList<>();

        for (String s : jd.getTokens()) {

            if (r.getTokens().contains(s)) {

                qs.add(
                        "Explain your experience in "
                                + s
                );

            } else {

                qs.add(
                        "What do you know about "
                                + s
                );
            }
        }

        return qs;
    }
}
