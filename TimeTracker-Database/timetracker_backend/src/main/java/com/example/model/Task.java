package com.example.model;

import org.springframework.data.domain.Persistable;

public class Task implements Persistable<Long>{

	private static final long serialVersionUID = 8691351324070609515L;

	private long taid; //Die entsprechende Task-ID

	private String taskName;
	
	private long projectID;
	
	public Task() { }

	public Task(long taid, String taskName, long projectID) {
		this.taid = taid;
		this.taskName = taskName;
		this.projectID = projectID;
	}

	@Override
	public Long getId() {
		return taid;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	
	public Long getProjectID() {
		return projectID;
	}
	
	public void setProjectId(long projectID) {
		this.projectID = projectID;
	}

	@Override
	public boolean isNew() {
		// TODO Handle this in the future in the controller
		return true;
	}

}