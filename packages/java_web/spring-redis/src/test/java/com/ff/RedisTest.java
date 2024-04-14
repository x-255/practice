package com.ff;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
@Slf4j
public class RedisTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void test1 () {
        redisTemplate.opsForValue().set("age", 10);
        Object age = redisTemplate.opsForValue().get("age");
        log.info("age: {}", age);
    }
}
