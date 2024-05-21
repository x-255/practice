package com.atguigu.cloud.apis;

import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.resp.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(value = "cloud-payment-service", path = "/pay")
public interface PayFeignApi {
    @PostMapping
    public Result addPay(@RequestBody PayDTO payDTO);

    @GetMapping("/{id}")
    public Result getPay(@PathVariable("id") Integer id);

    @GetMapping("/get/info")
    public Result testInfo();

    @GetMapping(value = "/circuit/{id}")
    public String myCircuit(@PathVariable("id") Integer id);

    @GetMapping(value = "/bulkhead/{id}")
    public String myBulkhead(@PathVariable("id") Integer id);

    @GetMapping(value = "/ratelimit/{id}")
    public String myRatelimit(@PathVariable("id") Integer id);
}
