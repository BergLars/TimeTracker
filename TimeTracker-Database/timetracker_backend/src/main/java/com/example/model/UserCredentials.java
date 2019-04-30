package com.example.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserCredentials implements Serializable{
	   
	/**
	 * 
	 */
	private static final long serialVersionUID = -3009157732242241606L;

	private String username;
	     
    private String password;
    
    public UserCredentials() {
    	
    }
    
    public UserCredentials (String username, String password) {
    	this.username = username;
    	this.password = password;
    }
    
	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
