package com.tlias.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class DemoFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("DemoFilter init");
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("拦截到请求，放行前逻辑。。。");
        chain.doFilter(request, response);
        System.out.println("拦截到响应，放行后逻辑。。。");
    }

    @Override
    public void destroy() {
        System.out.println("DemoFilter destroy");
        Filter.super.destroy();
    }
}
