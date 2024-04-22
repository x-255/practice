package com.ff.cloudorder.controller;

import com.ff.cloudorder.pojo.Order;
import com.ff.cloudorder.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable long id) {
        return orderService.getOrderById(id);
    }
}
