import java.io.*;
import java.util.*;

public class UserStore {

    static String FILE =
            "users.txt";

    public static boolean register(
            String u,
            String p)
            throws Exception {

        File f =
                new File(FILE);

        if (!f.exists()) {

            f.createNewFile();
        }

        List<String> users =
                java.nio.file.Files
                        .readAllLines(
                                f.toPath()
                        );

        for (String line : users) {

            String[] parts =
                    line.split(",");

            if (parts[0].equals(u)) {

                return false;
            }
        }

        FileWriter fw =
                new FileWriter(
                        FILE,
                        true
                );

        fw.write(
                u + "," + p + "\n"
        );

        fw.close();

        return true;
    }

    public static boolean login(
            String u,
            String p)
            throws Exception {

        File f =
                new File(FILE);

        if (!f.exists())
            return false;

        List<String> users =
                java.nio.file.Files
                        .readAllLines(
                                f.toPath()
                        );

        for (String line : users) {

            String[] parts =
                    line.split(",");

            if (
                    parts[0].equals(u)
                            &&
                            parts[1].equals(p)
            ) {

                return true;
            }
        }

        return false;
    }
}