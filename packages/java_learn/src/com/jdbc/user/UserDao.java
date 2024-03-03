package com.jdbc.user;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;

import com.jdbc.api.BaseDao;

public class UserDao extends BaseDao {

  public void insert() throws SQLException {
    String sql = "insert into t_user(account, password, nickname) values(?, ?, ?)";
    super.executeUpdate(sql, "zhaoliu", "123", "赵六");
  }

  public void update() throws SQLException {
    String sql = "update t_user set password = ? where id = ?";
    executeUpdate(sql, "456", 10108);
  }

  public void delete() throws SQLException {
    String sql = "delete from t_user where id = ?";
    executeUpdate(sql, 10108);
  }

  public void select() throws InstantiationException, IllegalAccessException, IllegalArgumentException,
      InvocationTargetException, NoSuchMethodException, SecurityException, NoSuchFieldException, SQLException {
    String sql = "select * from t_user";

    List<UserBean> res = executeQuery(UserBean.class, sql);
    System.out.println(res);
  }
}
