package com.sboot;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sboot.mapper.UserMapper;
import com.sboot.pojo.User;

@SpringBootTest
class SbootApplicationTests {
	@Autowired
	private UserMapper userMapper;

	@Test
	void testUserList() {
		List<User> list = userMapper.list();

		list.stream().forEach(System.out::println);
	}

}
