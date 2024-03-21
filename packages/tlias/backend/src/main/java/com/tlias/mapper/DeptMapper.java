package com.tlias.mapper;

import com.tlias.pojo.Dept;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DeptMapper {
    @Select("select * from dept")
    List<Dept> list();

    @Insert("insert into dept (name, create_time, update_time) values (#{name}, now(), now())")
    void insert(Dept dept);

    @Delete("delete from dept where id = #{id}")
    void delete(int id);

    @Update("update dept set name = #{name}, update_time = now() where id = #{id}")
    void update(Dept dept);
}
