package com.mp.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;

import java.io.Serializable;

/**
 * 用户表(User)表实体类
 *
 * @author makejava
 * @since 2024-04-26 22:24:17
 */
@Data
public class User extends Model<User> {
//ID
    private Integer id;
//姓名
    private String name;
//年龄
    private Integer age;
//性别, 1:男, 2:女
    private Integer gender;
//手机号
    private String phone;
    private Integer money;
}

