package com.tlias;

import com.tlias.controller.DeptController;
import com.tlias.pojo.Emp;
import com.tlias.utils.TokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
class BackendApplicationTests {
	private String token = "";


	@Autowired
	private ApplicationContext applicationContext;

	@Test
	void contextLoads() {
	}

	@Test
	public void testGenJWT () {
		Emp emp = new Emp();
		emp.setId(1);
		emp.setName("AAA");
		emp.setUsername("aaa");
		String token = TokenUtil.genAccessToken(emp);

		System.out.println(token);
    }

	@Test
	public void testJWTHeader () {
		JwsHeader jwsHeader = TokenUtil.parseHeader(token);
		System.out.println(jwsHeader);
	}

	@Test
	public void ParseJWTPayload () {
		Claims claims = TokenUtil.parsePayload(token);
		System.out.println(claims);
	}

	@Test
	public void testBean () {
		DeptController bean1 = (DeptController) applicationContext.getBean("deptController");
		DeptController bean2 = applicationContext.getBean(DeptController.class);
		DeptController bean3 = applicationContext.getBean("deptController", DeptController.class);

		System.out.println(bean1);
		System.out.println(bean2);
		System.out.println(bean3);
	}
}
