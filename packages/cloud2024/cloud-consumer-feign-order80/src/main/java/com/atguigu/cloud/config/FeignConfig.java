package com.atguigu.cloud.config;

import feign.Logger;
import feign.Retryer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    @Bean
    public Retryer myRetryer()
    {
        // 默认配置，不走重试策略
        return Retryer.NEVER_RETRY;

        // 最大请求次数为3，初始间隔时间为100ms，重试间最大间隔时间为1s
        // return new Retryer.Default(100,1,3);
    }

    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
