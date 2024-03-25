package com.tlias.interceptor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tlias.pojo.Result;
import com.tlias.utils.TokenUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");

        if (token == null || token.isEmpty()) {
            writeNotLogin(request, response);
            return false;
        }

        try {
            Claims claims = TokenUtil.parsePayload(token);
            log.info("claims: {}", claims);
        } catch (Exception e) {
            writeNotLogin(request, response);
            return false;
        }

        return true;
    }

    private void writeNotLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result result = Result.error("NOT_LOGIN");
        String json = new ObjectMapper().writeValueAsString(result);
        response.getWriter().write(json);
    }
}
