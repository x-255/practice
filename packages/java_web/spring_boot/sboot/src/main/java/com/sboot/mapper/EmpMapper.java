package com.sboot.mapper;

import com.sboot.pojo.Emp;
import org.apache.ibatis.annotations.*;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface EmpMapper {
    @Delete("delete from emp where id = #{id}")
    void delete(Integer id);

    @Options(keyProperty = "id", useGeneratedKeys = true)
    @Insert("""
        insert into emp(username, name, gender, image, job, entrydate, dept_id, create_time, update_time)
        values(#{username}, #{name}, #{ gender}, #{image}, #{job}, #{entryDate}, #{deptId}, now(), now())
        """)
    void insert(Emp emp);

    @Update("""
            update emp
            set
                username = #{username},
                name = #{name},
                update_time = now()
            where id = #{id}
        """)
    void update(Emp emp);

    @Select("select  * from emp where id = #{id}")
    Emp getEmpById(@Param("id") Integer id);

    List<Emp> getEmps(String name, Short gender, LocalDate start, LocalDate end);
}
