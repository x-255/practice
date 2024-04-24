package com.ff.cloudorder.pojo;

import com.ff.clouduser.pojo.User;
import lombok.Data;

@Data
public class Order {
    private long id;
    private long userId;
    private String name;
    private int price;
    private int num;
    private User user;
}
