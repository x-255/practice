package com.jdbc.user;

import java.sql.SQLException;

public class UserService {
  public static void main(String[] args) throws SQLException {
    UserDao userDao = new UserDao();

    userDao.insert();
  }
}
