package com.tlias.service.impl;

import com.tlias.mapper.DeptMapper;
import com.tlias.mapper.EmpMapper;
import com.tlias.pojo.Dept;
import com.tlias.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeptServiceImpl implements DeptService {
    @Autowired
    DeptMapper deptMapper;

    @Autowired
    EmpMapper empMapper;

    @Override
    public List<Dept> list() {
        return deptMapper.list();
    }

    @Override
    public void insert(Dept dept) {
        deptMapper.insert(dept);
    }

    @Transactional
    @Override
    public void delete(Integer id) {
        deptMapper.delete(id);
        empMapper.deleteByDeptId(id);
    }

    @Override
    public void update(Dept dept) {
        deptMapper.update(dept);
    }
}
