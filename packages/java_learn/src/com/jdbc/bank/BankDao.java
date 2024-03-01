package com.jdbc.bank;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.jdbc.api.JdbcUtil;

public class BankDao {
  public void add(String account, int money) throws SQLException {
    Connection connection = JdbcUtil.getConnection();

    String sql = "update t_bank set money = money + ? where account = ?";
    PreparedStatement statement = connection.prepareStatement(sql);

    statement.setObject(1, money);
    statement.setObject(2, account);

    statement.executeUpdate();
    System.out.println("加钱成功...");

    statement.close();
  }

  public void sub(String account, int money) throws SQLException {
    Connection connection = JdbcUtil.getConnection();

    String sql = "update t_bank set money = money - ? where account = ?";
    PreparedStatement statement = connection.prepareStatement(sql);

    statement.setObject(1, money);
    statement.setObject(2, account);

    statement.executeUpdate();
    System.out.println("扣钱成功...");

    statement.close();
  }
}
