package com.mp.service;

import com.mp.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    void testSave () {
        User user = new User();
        user.setName("姚秀英");
        user.setAge(22);
        user.setGender(2);
        user.setPhone("12345678901");
        user.setMoney(2000);

        userService.save(user);
    }
}