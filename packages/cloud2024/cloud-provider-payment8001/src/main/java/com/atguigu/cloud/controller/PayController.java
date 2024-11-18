package com.atguigu.cloud.controller;

import cn.hutool.core.bean.BeanUtil;
import com.atguigu.cloud.entities.Pay;
import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.resp.Result;
import com.atguigu.cloud.service.PayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/pay")
@Tag(name="支付微服务")
public class PayController {
    @Resource
    PayService payService;

    @PostMapping
    @Operation(summary = "新增支付", description = "新增支付流水")
    public Result addPay(@RequestBody PayDTO payDTO) {
        Pay pay = new Pay();
        BeanUtil.copyProperties(payDTO, pay);

        int i = payService.add(pay);
        return Result.success("新增成功，结果: " + i);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除支付", description = "根据id删除支付流水")
    public Result deletePay(@PathVariable("id") Integer id) {
        int i = payService.delete(id);
        return Result.success("删除成功，结果: " + i);
    }

    @PutMapping
    @Operation(summary = "更新支付", description = "更新支付流水")
    public Result updatePay(@RequestBody PayDTO payDTO) {
        Pay pay = new Pay();
        BeanUtil.copyProperties(payDTO, pay);

        int i = payService.update(pay);
        return Result.success("更新成功，结果: " + i);
    }

    @GetMapping
    @Operation(summary = "获取所有支付", description = "获取所有支付流水")
    public Result getAllPay() {
        return Result.success(payService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取支付", description = "根据id获取支付流水")
    public Result getPay(@PathVariable("id") Integer id) {
        try {
            TimeUnit.SECONDS.sleep(30);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return Result.success(payService.getById(id));
    }

    @Value("${server.port}")
    private String port;

    @GetMapping("/get/info")
    @Operation(summary = "测试", description = "测试info")
    public Result testInfo(@Value("${test.info}") String info) {
        return Result.success("port: " + port + ", info: " + info);
    }
}
