package com.ff.cloudorder.service.impl;

import com.ff.cloudorder.mapper.OrderMapper;
import com.ff.cloudorder.pojo.Order;
import com.ff.cloudorder.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Order getOrderById(long id) {
        return orderMapper.getOrderById(id);
    }
}
