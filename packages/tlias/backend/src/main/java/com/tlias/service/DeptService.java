package com.tlias.service;

import com.tlias.pojo.Dept;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DeptService {
    List<Dept> list();

    void insert(Dept dept);
    void delete(Integer id);

    void update(Dept dept);
}
