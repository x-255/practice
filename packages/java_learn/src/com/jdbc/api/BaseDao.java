package com.jdbc.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BaseDao {
  public int executeUpdate(String sql, Object... args) throws SQLException {
    Connection connection = JdbcUtil.getConnection();
    PreparedStatement statement = connection.prepareStatement(sql);

    if (args != null) {
      for (int i = 0; i < args.length; i++) {
        statement.setObject(i + 1, args[i]);
      }
    }

    int rows = statement.executeUpdate();

    statement.close();
    if (connection.getAutoCommit()) {
      connection.close();
    }

    return rows;
  }

  public <T> List<T> executeQuery(Class<T> clazz, String sql, Object... args) throws SQLException {
    Connection connection = JdbcUtil.getConnection();
    PreparedStatement statement = connection.prepareStatement(sql);

    if (args != null) {
      for (int i = 0; i < args.length; i++) {
        statement.setObject(i + 1, args[i]);
      }
    }

    ResultSet resultSet = statement.executeQuery();
    ResultSetMetaData metaData = resultSet.getMetaData();
    int columnCount = metaData.getColumnCount();

    List<T> list = new ArrayList<>();

    return list;
  }
}
