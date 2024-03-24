package com.tlias.utils;

import com.tlias.pojo.Emp;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

public class TokenUtil {
    /**
     * 过期时间(单位:秒)
     */
    public static final int ACCESS_EXPIRE = 60 * 60;
    /**
     * 加密算法
     */
    private final static SecureDigestAlgorithm<SecretKey, SecretKey> ALGORITHM = Jwts.SIG.HS256;
    /**
     * 私钥 / 生成签名的时候使用的秘钥secret，一般可以从本地配置文件中读取，切记这个秘钥不能外露，只在服务端使用，在任何场景都不应该流露出去。
     * 一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。
     * 应该大于等于 256位(长度32及以上的字符串)，并且是随机的字符串
     */
    private final static String SECRET = "mdkfsjodfjsojdfiosjfasdaiosjfjaojajf";
    /**
     * 秘钥实例
     */
    public static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String genAccessToken(Emp emp) {
        Date exprireDate = Date.from(Instant.now().plusSeconds(ACCESS_EXPIRE));

        return Jwts.builder()
            // 设置头部信息header
            .header()
            .add("typ", "JWT")
            .add("alg", "HS256")
            .and()
            // 设置自定义负载信息payload
            .claim("id", emp.getId())
            .claim("name", emp.getName())
            .claim("username", emp.getUsername())
            // 过期日期
            .expiration(exprireDate)
            // 签名
            .signWith(KEY, ALGORITHM)
            .compact();
    }
    /**
     * 解析token
     * @param token token
     * @return Jws<Claims>
     */
    public static Jws<Claims> parseClaim(String token) {
        return Jwts.parser()
            .verifyWith(KEY)
            .build()
            .parseSignedClaims(token);
    }

    public static JwsHeader parseHeader(String token) {
        return parseClaim(token).getHeader();
    }

    public static Claims parsePayload(String token) {
        return parseClaim(token).getPayload();
    }
}
