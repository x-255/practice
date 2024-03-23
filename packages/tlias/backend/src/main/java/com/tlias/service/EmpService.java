package com.tlias.service;

import com.tlias.pojo.Emp;
import com.tlias.pojo.PageBean;
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


    void insert(Emp emp);

    void update(Emp emp);

    void delete(Integer[] ids);
}
