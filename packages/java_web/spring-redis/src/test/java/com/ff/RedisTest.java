package com.ff;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ff.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

@SpringBootTest
public class RedisTest {
    @Autowired
    private RedisTemplate<String, Object> redisTemp;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Test
    public void test1 () {
        redisTemp.opsForValue().set("user", "zs");
        Object user = redisTemp.opsForValue().get("user");
        System.out.println("user = " + user);
    }

    @Test
    public void testUser () {
        redisTemp.opsForValue().set("user:1", new User("zs", 18));

        User user = (User) redisTemp.opsForValue().get("user:1");
        System.out.println("user = " + user);
    }

    private static final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void testStringTemp () throws JsonProcessingException {
        User user = new User("ls", 20);
        stringRedisTemplate.opsForValue().set("user:2", mapper.writeValueAsString(user));

        String userJson = stringRedisTemplate.opsForValue().get("user:2");
        User user1 = mapper.readValue(userJson, User.class);
        System.out.println("user1 = " + user1);
    }
}
