package com.atguigu.cloud.exp;

import cn.hutool.http.HttpStatus;
import com.atguigu.cloud.resp.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public Result runtimeEx(RuntimeException e) {
        return Result.fail(HttpStatus.HTTP_INTERNAL_ERROR, e.getMessage());
    }
}
