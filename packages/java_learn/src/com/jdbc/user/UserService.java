package com.jdbc.user;

public class UserService {
  public static void main(String[] args) throws Exception {
    UserDao userDao = new UserDao();

    userDao.select();
  }
}
