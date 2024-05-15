package com.atguigu.cloud.controller;

import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.resp.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/consumer")
@Tag(name="订单微服务")
public class OrderController {
//    private static final String PAYMENT_URL = "http://localhost:8001";
    private static final String PAYMENT_URL = "http://cloud-payment-service";

    @Resource
    private RestTemplate restTemplate;

    @PostMapping("/pay")
    @Operation(summary = "新增订单", description = "新增订单流水")
    public Result addOrder(@RequestBody PayDTO payDTO) {
        return restTemplate.postForObject(PAYMENT_URL + "/pay", payDTO, Result.class);
    }

    @GetMapping("/pay/{id}")
    @Operation(summary = "获取订单", description = "根据id获取订单流水")
    public Result getPayInfo(@PathVariable("id") Integer id) {
        return restTemplate.getForObject(PAYMENT_URL + "/pay/" + id, Result.class);
    }

    @PutMapping("/pay")
    @Operation(summary = "更新订单", description = "更新订单流水")
    public Result updatePay(@RequestBody PayDTO payDTO) {
        restTemplate.put(PAYMENT_URL + "/pay", payDTO);
        return Result.success("更新成功");
    }

    @DeleteMapping("/pay/{id}")
    @Operation(summary = "删除订单", description = "根据id删除订单流水")
    public Result deletePay(@PathVariable("id") Integer id) {
        restTemplate.delete(PAYMENT_URL + "/pay/" + id);
        return Result.success("删除成功");
    }

    @GetMapping("/pay/get/info")
    @Operation(summary = "测试获取信息", description = "获取info配置信息")
    public Result getInfo() {
        return restTemplate.getForObject(PAYMENT_URL + "/pay/get/info", Result.class);
    }
}
