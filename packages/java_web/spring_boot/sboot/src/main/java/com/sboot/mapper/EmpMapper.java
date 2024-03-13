package com.sboot.mapper;

import com.sboot.pojo.Emp;
import org.apache.ibatis.annotations.*;

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

    @Results({
        @Result(column = "dept_id", property = "deptId"),
        @Result(column = "create_time", property = "createTime"),
        @Result(column = "update_time", property = "updateTime")
    })
    @Select("select  * from emp where id = #{id}")
    Emp getEmpById(Integer id);
}
