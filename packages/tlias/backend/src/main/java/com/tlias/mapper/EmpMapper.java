package com.tlias.mapper;

import com.tlias.pojo.Emp;
import org.apache.ibatis.annotations.*;

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

    void insert(Emp emp);

    void update(Emp emp);

    void delete(Integer[] ids);

    Emp getEmpByUsernameAndPassword(String username, String password);

    void deleteByDeptId(Integer deptId);
}
