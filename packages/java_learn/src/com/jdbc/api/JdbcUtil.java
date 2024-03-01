package com.jdbc.api;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

public class JdbcUtil {
  static private DataSource dataSource;
  static private ThreadLocal<Connection> tl = new ThreadLocal<Connection>();

  static {

    InputStream ips = JdbcUtil.class.getClassLoader().getResourceAsStream("druid.properties");
    Properties properties = new Properties();

    try {
      properties.load(ips);
    } catch (IOException e) {
      e.printStackTrace();
    }

    try {
      dataSource = DruidDataSourceFactory.createDataSource(properties);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  static public Connection getConnection() throws SQLException {
    Connection connection = tl.get();

    if (connection == null) {
      connection = dataSource.getConnection();
      tl.set(connection);
    }

    return connection;
  }

  static public void freeConnection() throws SQLException {
    Connection connection = tl.get();

    if (connection != null) {
      tl.remove();
      connection.setAutoCommit(true);
      connection.close();
    }
  }
}
