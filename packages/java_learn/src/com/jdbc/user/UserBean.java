package com.jdbc.user;

public class UserBean {
  private int id;
  private String account;
  private String password;
  private String nickname;

  public UserBean() {
  }

  @Override
  public String toString() {
    return "UserBean [id=" + id + ", account=" + account + ", password=" + password + ", nickname=" + nickname + "]";
  }
}
