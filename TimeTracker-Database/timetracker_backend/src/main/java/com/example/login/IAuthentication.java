package com.example.login;

public interface IAuthentication {
	public void login( String username, String password);
	public void logout();
	public void resetPassword(String password, String newPassword);
}
