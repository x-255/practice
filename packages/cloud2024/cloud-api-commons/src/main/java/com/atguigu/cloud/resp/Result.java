package com.atguigu.cloud.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result implements Serializable {
    private Integer code;
    private String message;
    private Object data;
    private Long timestamp ;

    public Result(Integer code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
        timestamp = System.currentTimeMillis();
    }

    public static Result success(Object data) {
        return new Result(200, "success", data);
    }

    public static Result fail(Integer code, String message) {
        return new Result(code, message, null);
    }
}
