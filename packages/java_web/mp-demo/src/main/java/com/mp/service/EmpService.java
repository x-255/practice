package com.mp.service;

import com.mp.entity.Emp;

import java.util.List;

public interface EmpService {
    public List<Emp> list();

    public Emp getEmpById(Integer id);

    public void insertEmp(Emp emp);

    public void updateEmp(Emp emp);

    public void deleteEmp(Integer id);
}
