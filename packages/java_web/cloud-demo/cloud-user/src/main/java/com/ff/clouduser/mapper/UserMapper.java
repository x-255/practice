package com.ff.clouduser.mapper;

import com.ff.clouduser.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM tb_user WHERE id = #{id}")
    public User getUserById(long id);
}
