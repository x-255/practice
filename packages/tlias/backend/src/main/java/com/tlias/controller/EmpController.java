package com.tlias.controller;

import com.tlias.pojo.PageBean;
import com.tlias.pojo.Result;
import com.tlias.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@CrossOrigin
@RequestMapping("/emps")
public class EmpController {
    @Autowired
    private EmpService empService;

    @GetMapping
    public Result list(String name,
                       Short gender,
                       LocalDate begin,
                       LocalDate end,
                       Integer page,
                       Integer pageSize) {
        PageBean pageBean = empService.list(name, gender, begin, end, page, pageSize);
        return Result.success(pageBean);
    }
}
