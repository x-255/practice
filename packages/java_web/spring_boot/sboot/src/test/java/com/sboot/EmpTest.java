package com.sboot;

import com.sboot.mapper.EmpMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmpTest {
    @Autowired
    EmpMapper empMapper;

    @Test
    public void testDelete() {
        empMapper.delete(17);
    }
}
