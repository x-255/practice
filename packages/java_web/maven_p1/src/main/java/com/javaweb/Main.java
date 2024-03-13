package com.javaweb;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Map map = new HashMap();
        map.put("a", 111);
        map.put("b", 222);

        Set entrySet = map.entrySet();
        System.out.println("====" + entrySet);
    }
}