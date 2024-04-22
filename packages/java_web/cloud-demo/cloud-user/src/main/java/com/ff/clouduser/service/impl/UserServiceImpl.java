package com.ff.clouduser.service.impl;

import com.ff.clouduser.mapper.UserMapper;
import com.ff.clouduser.pojo.User;
import com.ff.clouduser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(long id) {
        return userMapper.getUserById(id);
    }
}
