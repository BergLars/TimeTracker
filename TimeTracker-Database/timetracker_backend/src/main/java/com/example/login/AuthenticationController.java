package com.example.login;

import com.example.model.UserProfile;

public class AuthenticationController {
	private IAuthentication databaseAuthentication;
	private UserProfile user;
	
	public AuthenticationController(){
		databaseAuthentication = new DatabaseAuthentication();
	}
	
	public void loginDatabase(){
		databaseAuthentication.login(user.getUserName(), user.getPassword());
	}
}
