package com.ff.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class BeanConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemp(LettuceConnectionFactory lettuceConnectionFactory) {
        RedisTemplate<String, Object> redisTemp = new RedisTemplate<>();
        // 设置连接工厂
        redisTemp.setConnectionFactory(lettuceConnectionFactory);

        // 创建JSON序列化工具
        GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        // 设置key的序列化方式
        redisTemp.setKeySerializer(RedisSerializer.string());
        redisTemp.setHashKeySerializer(RedisSerializer.string());

        // 设置value的序列化方式
        redisTemp.setValueSerializer(genericJackson2JsonRedisSerializer);
        redisTemp.setHashValueSerializer(genericJackson2JsonRedisSerializer);

        return redisTemp;
    }
}
