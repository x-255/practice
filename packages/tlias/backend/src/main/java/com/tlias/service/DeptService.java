package com.tlias.service;

import com.tlias.pojo.Dept;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DeptService {
    List<Dept> list();
}
