package com.tlias.service;

import com.tlias.pojo.PageBean;
import com.tlias.pojo.Result;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public interface EmpService {
    PageBean list(String name,
                Short gender,
                LocalDate begin,
                LocalDate end,
                Integer page,
                Integer pageSize);
}
