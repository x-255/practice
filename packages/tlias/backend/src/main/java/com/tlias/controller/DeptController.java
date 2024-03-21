package com.tlias.controller;

import com.tlias.pojo.Dept;
import com.tlias.pojo.Result;
import com.tlias.service.DeptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/depts")
public class DeptController {
    @Autowired
    DeptService deptService;
    @GetMapping
    public Result list() {
        List<Dept> deptList = deptService.list();

        return Result.success(deptList);
    }

    @PostMapping
    public Result insert(@RequestBody Dept dept) {
        deptService.insert(dept);
        return Result.success(null, "添加成功");
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        deptService.delete(id);
        return Result.success(null, "删除成功");
    }

    @PutMapping
    public Result update(@RequestBody Dept dept) {
        deptService.update(dept);
        return Result.success(null, "修改成功");
    }
}
