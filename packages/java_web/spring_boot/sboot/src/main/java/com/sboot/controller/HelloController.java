package com.sboot.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sboot.pojo.Address;
import com.sboot.pojo.Result;
import com.sboot.pojo.User;

@RestController
public class HelloController {
  @RequestMapping("/hello")
  public String hello() {
    System.out.println("Hello world!");
    return "Hello world!";
  }

  @RequestMapping("/simpleParam")
  public String simpleParam(@RequestParam(name = "name", required = false) String username, int age) {
    System.out.println(username + ": " + age);
    return "Get ok!";
  }

  @RequestMapping("/simplePojo")
  public String simplePojo(User user) {
    System.out.println(user);
    return "Get ok!";
  }

  @RequestMapping("/arrayParam")
  public String arrayParam(String[] hobby) {
    System.out.println(Arrays.toString(hobby));
    return "Get ok!";
  }

  @RequestMapping("/listParam")
  public String listParam(@RequestParam List<String> hobby) {
    System.out.println(hobby);
    return "Get ok!";
  }

  @RequestMapping("/dateParam")
  public String dateParam(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime time) {
    System.out.println(time);
    return "Get ok!";
  }

  @RequestMapping("/jsonParam")
  public String jsonParam(@RequestBody User user) {
    System.out.println(user);
    return "Get ok!";
  }

  
  @RequestMapping("/path/{id}")
  public String path(@PathVariable int id) {
    System.out.println(id);
    return "Get ok!";
  }

  @RequestMapping("/arrAddr")
  public Result arrAddr() {
    Address[] arr = new Address[2];
    arr[0] = new Address("Beijing", "China");
    arr[1] = new Address("Shanghai", "China");
    return Result.success(arr);
  }
}
