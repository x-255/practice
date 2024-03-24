package com.tlias;

import com.tlias.pojo.Emp;
import com.tlias.utils.TokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//@SpringBootTest
class BackendApplicationTests {
	private String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFBQSIsInVzZXJuYW1lIjoiYWFhIiwiZXhwIjoxNzExMjkwMjM0fQ.3-4QLLjtxHCRtKFLykeBqpiieW4fj_vr1nHfagfV2-o";

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
}
