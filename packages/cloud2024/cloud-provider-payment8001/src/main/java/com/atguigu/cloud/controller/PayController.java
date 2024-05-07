package com.atguigu.cloud.controller;

import cn.hutool.core.bean.BeanUtil;
import com.atguigu.cloud.entities.Pay;
import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.service.PayService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pay")
public class PayController {
    @Resource
    PayService payService;

    @PostMapping("/add")
    public String addPay(@RequestBody PayDTO payDTO) {
        Pay pay = new Pay();
        BeanUtil.copyProperties(payDTO, pay);

        int i = payService.add(pay);
        return "新增成功，结果: " + i;
    }

    @DeleteMapping("/delete/{id}")
    public String deletePay(@PathVariable Integer id) {
        int i = payService.delete(id);
        return "删除成功，结果: " + i;
    }

    @PutMapping("/update")
    public String updatePay(@RequestBody PayDTO payDTO) {
        Pay pay = new Pay();
        BeanUtil.copyProperties(payDTO, pay);

        int i = payService.update(pay);
        return "更新成功，结果: " + i;
    }

    @GetMapping("/get/{id}")
    public Pay getPay(@PathVariable Integer id) {
        return payService.getById(id);
    }

    @GetMapping("/getAll")
    public String getAllPay() {
        return payService.getAll().toString();
    }
}
