package com.mp.service.impl;

import com.mp.entity.Emp;
import com.mp.mapper.EmpMapper;
import com.mp.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    private EmpMapper empMapper;

    @Override
    public List<Emp> list() {
        return null;
    }

    @Override
    public Emp getEmpById(Integer id) {
        return null;
    }

    @Override
    public void insertEmp(Emp emp) {
        empMapper.insert(emp);
    }

    @Override
    public void updateEmp(Emp emp) {
        empMapper.updateById(emp);
    }

    @Override
    public void deleteEmp(Integer id) {
        empMapper.deleteById(id);
    }
}
