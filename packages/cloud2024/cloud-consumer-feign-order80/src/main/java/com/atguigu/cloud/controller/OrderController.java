package com.atguigu.cloud.controller;

import com.atguigu.cloud.apis.PayFeignApi;
import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.resp.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;


@RestController
@RequestMapping("/feign")
@Tag(name="订单微服务")
public class OrderController {
    @Resource
    private PayFeignApi payFeignApi;

    @PostMapping("/pay")
    @Operation(summary = "feign新增支付", description = "新增支付信息")
    public Result addPay(@RequestBody PayDTO payDTO) {
        return payFeignApi.addPay(payDTO);
    }

    @GetMapping("/pay/{id}")
    @Operation(summary = "feign获取支付信息", description = "根据ID获取支付信息")
    public Result getPay(@PathVariable("id") Integer id) {
        Result res;
        try {
            System.out.println("start===" + LocalTime.now());
           res = payFeignApi.getPay(id);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("end===" + LocalTime.now());
            return Result.fail(999,"获取支付信息失败");
        }

        return res;
    }

    @GetMapping("/get/info")
    @Operation(summary = "feign获取测试信息", description = "获取测试信息")
    public Result testInfo() {
        return payFeignApi.testInfo();
    }
}
