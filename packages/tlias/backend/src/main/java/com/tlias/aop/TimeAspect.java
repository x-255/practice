package com.tlias.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class TimeAspect {
    @Pointcut("execution(* com.tlias.service.*.*(..))")
    private void pt() {}

    @Around("pt()")
    public Object recordTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long begin = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();

        log.info("{} 执行耗时：{}ms", proceedingJoinPoint.getSignature(), end - begin);

        return result;
    }
}
