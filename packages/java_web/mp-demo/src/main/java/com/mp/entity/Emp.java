package com.mp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.mp.enums.EmpJob;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Emp {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String username;
    private String password;
    private String name;
    private Byte gender;
    private  String image;
    private EmpJob job;
    private Integer deptId;
    private LocalDate entrydate;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
