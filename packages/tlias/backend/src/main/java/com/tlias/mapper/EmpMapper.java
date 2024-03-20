package com.tlias.mapper;

import com.tlias.pojo.Emp;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface EmpMapper {
    @Select("select  count(0) from emp")
    Long count();

    List<Emp> list(String name,
                   Short gender,
                   LocalDate begin,
                   LocalDate end,
                   Integer page,
                   Integer pageSize);
}
