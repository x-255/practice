package com.jdbc.bank;

import java.sql.Connection;
import java.sql.SQLException;

import com.jdbc.api.JdbcUtil;

public class BankService {
  public void transfer(String from, String to, int money) throws SQLException {
    BankDao bankDao = new BankDao();
    Connection connection = JdbcUtil.getConnection();

    try {
      connection.setAutoCommit(false);

      bankDao.add(to, money);
      bankDao.sub(from, money);

      connection.commit();
    } catch (Exception e) {
      connection.rollback();
      e.printStackTrace();
    } finally {
      JdbcUtil.freeConnection();
    }
  }
}
