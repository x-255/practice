package com.tlias.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.tlias.mapper.EmpMapper;
import com.tlias.pojo.Emp;
import com.tlias.pojo.PageBean;
import com.tlias.pojo.Result;
import com.tlias.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    private EmpMapper empMapper;

    @Override
    public PageBean list(String name,
                       Short gender,
                       LocalDate begin,
                       LocalDate end,
                       Integer page,
                       Integer pageSize) {
        PageHelper.startPage(page, pageSize);

        List<Emp> emps = empMapper.list(name, gender, begin, end);
        Page<Emp> p = (Page<Emp>) emps;

        return new PageBean(p.getTotal(), p.getResult());
    }
}
