package com.sboot.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.sboot.pojo.User;

@Mapper
public interface UserMapper {
  @Select("select * from user")
  public List<User> list();
}
