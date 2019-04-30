package com.example.model;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
public class UserProfile implements Persistable<Long>{
     
    private static final long serialVersionUID = -3009157732242241606L;
    private long uid;
     
    private String username;
     
    private String password;
    
    private boolean isAdmin;
    
    private String name;
        
    public UserProfile() { }
 
    public UserProfile(long uid, String username, String name, String password, boolean isAdmin) {
        this.uid = uid;
    	this.username = username;
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    
	@Override
	public Long getId() {
		return uid;
	}
	
	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public boolean isNew() {
		// TODO Auto-generated method stub
		return true;
	}

}