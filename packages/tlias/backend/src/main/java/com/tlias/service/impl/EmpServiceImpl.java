package com.tlias.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.tlias.mapper.EmpMapper;
import com.tlias.pojo.Emp;
import com.tlias.pojo.PageBean;
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

        List<Emp> emps = empMapper.list(name, gender, begin, end, page, pageSize);
        Page<Emp> p = (Page<Emp>) emps;

        return new PageBean(p.getTotal(), p.getResult());
    }

    @Override
    public void insert(Emp emp) {
        empMapper.insert(emp);
    }

    @Override
    public void update(Emp emp) {
        empMapper.update(emp);
    }

    @Override
    public void delete(Integer[] ids) {
        empMapper.delete(ids);
    }
}
