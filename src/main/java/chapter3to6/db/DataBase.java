package chapter3to6.db;

import java.util.Collection;
import java.util.Map;

import chapter3to6.model.User;
import com.google.common.collect.Maps;

public class DataBase {
    private static Map<String, User> users = Maps.newHashMap();

    public static void addUser(User user) {
        users.put(user.getUserId(), user);
    }

    public static User findUserById(String userId) {
        return users.get(userId);
    }

    public static Collection<User> findAll() {
        return users.values();
    }
}
