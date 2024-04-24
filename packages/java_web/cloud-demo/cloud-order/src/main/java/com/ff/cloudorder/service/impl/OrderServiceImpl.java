package com.ff.cloudorder.service.impl;

import com.ff.cloudorder.mapper.OrderMapper;
import com.ff.cloudorder.pojo.Order;
import com.ff.cloudorder.service.OrderService;
import com.ff.clouduser.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Order getOrderById(long id) {
        Order order = orderMapper.getOrderById(id);
        // 用服务名代替ip、端口号调用其他服务接口
        String url = "http://cloud-user/users/" + order.getUserId();
        User user = restTemplate.getForObject(url, User.class);
        order.setUser(user);
        return order;
    }
}
