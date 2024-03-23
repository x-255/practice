package com.tlias.controller;

import com.tlias.pojo.Emp;
import com.tlias.pojo.PageBean;
import com.tlias.pojo.Result;
import com.tlias.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin
@RequestMapping("/emps")
public class EmpController {
    @Autowired
    private EmpService empService;

    @GetMapping
    public Result list(String name, Short gender, LocalDate begin, LocalDate end, Integer page, Integer pageSize) {
        PageBean pageBean = empService.list(name, gender, begin, end, page, pageSize);
        return Result.success(pageBean);
    }

    @PostMapping
    public Result insert(@RequestBody Emp emp) {
        empService.insert(emp);
        return Result.success(null, "添加成功");
    }

    @PutMapping
    public Result update(@RequestBody Emp emp) {
        empService.update(emp);
        return Result.success(null, "修改成功");
    }

    @DeleteMapping("/{ids}")
    public Result delete(@PathVariable Integer[] ids) {
        empService.delete(ids);
        return Result.success(null, "删除成功");
    }
}
