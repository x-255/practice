package com.mp.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.Getter;

@Getter
public enum EmpJob {
    CLASS_TEACHER(1, "班主任"),
    LECTURER(2, "讲师"),
    STUDENT_WORK_SUPERVISOR(3, "学工主管"),
    TEACHING_RESEARCH_SUPERVISOR(4, "教研主管"),
    CONSULTANT(5, "咨询师");

    @EnumValue
    private final Integer value;
    private final String desc;

    EmpJob(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
