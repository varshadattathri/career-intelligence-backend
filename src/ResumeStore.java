import java.util.*;

public class ResumeStore {

    static List<String> resumes =
            new ArrayList<>();

    public static void saveResume(
            String user,
            String resume
    ) {

        resumes.add(user + ":" + resume);
    }

    public static List<String> getAllResumes() {

        return resumes;
    }
}