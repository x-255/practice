package com.mp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mp.entity.Emp;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmpMapper extends BaseMapper<Emp> {
}
