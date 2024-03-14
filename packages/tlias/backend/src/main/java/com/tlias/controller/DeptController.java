package com.tlias.controller;

import com.tlias.pojo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class DeptController {
    @RequestMapping("/depts")
    public Result list() {
        log.info("dept list");
        return Result.success();
    }
}
