package com.mp;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.mp.entity.Emp;
import com.mp.entity.User;
import com.mp.mapper.EmpMapper;
import com.mp.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class MpDemoApplicationTests {
    @Autowired
    private EmpMapper empMapper;

    @Autowired
    private UserMapper userMapper;

    @Test
    void testInsert() {
        Emp emp = new Emp();
        emp.setUsername("zhangsan");
        emp.setName("张三");
        emp.setGender((byte) 1);
        emp.setJob((byte) 2);
        emp.setDeptId(3);
        LocalDateTime now = LocalDateTime.now();
        emp.setCreateTime(now);
        emp.setUpdateTime(now);

        empMapper.insert(emp);
    }

    @Test
    void testSelectById() {
        Emp emp = empMapper.selectById(17);
        System.out.println(emp);
    }

    @Test
    void testSelectByIds() {
        List<Integer> ids = Arrays.asList(1, 2, 3);
        List<Emp> emps = empMapper.selectBatchIds(ids);
        emps.forEach(System.out::println);
    }

    @Test
    void testDel() {
        empMapper.deleteById(17);
    }

    @Test
    void testQuery() {
        var wrapper = new LambdaQueryWrapper<Emp>()
            .select(Emp::getId, Emp::getName, Emp::getEntrydate)
            .like(Emp::getUsername, "zhang")
            .lt(Emp::getEntrydate, LocalDate.of(2010, 1, 1));

        List<Emp> emps = empMapper.selectList(wrapper);
        emps.forEach(System.out::println);
    }

    @Test
    void testUpdateMoney() {
        List<Integer> ids = List.of(1, 2, 3);

        UpdateWrapper<User> wrapper = new UpdateWrapper<User>()
            .in("id", ids);

        userMapper.updateMoneyByIds(wrapper, 200);
    }
}
