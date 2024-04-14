package org.example;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class JedisTest {
    private Jedis jedis;

    @BeforeEach
    void setUp() {
        try (JedisPool pool = new JedisPool()) {
            jedis = pool.getResource();
        }
    }

    @AfterEach
    void tearDown() {
        if (jedis != null) {
            jedis.close();
        }
    }

    @Test
    public void String () {
        String res = jedis.set("name", "Alice");
        System.out.println("res===" + res);

        String name = jedis.get("name");
        System.out.println("name===" + name);
    }
}
