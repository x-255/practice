package com.tlias.controller;

import com.tlias.pojo.Emp;
import com.tlias.pojo.Result;
import com.tlias.service.EmpService;
import com.tlias.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    EmpService empService;

    @PostMapping("/login")
    public Result login(@RequestBody Emp loginData) {
        Emp emp = empService.login(loginData.getUsername(), loginData.getPassword());

        if (emp == null) {
            return Result.error("用户名或密码错误");
        }

        String token = TokenUtil.genAccessToken(emp);
        return Result.success(token);
    }
}
