package com.example.model;

import java.sql.SQLException;
import java.util.Date;

import org.postgresql.util.PGInterval;
import org.springframework.data.domain.Persistable;

import com.example.utils.JsonDateDeserializer;
import com.example.utils.JsonDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class TimeEntry implements Persistable<Long> {

	private static final long serialVersionUID = -3009157732242241606L;
	private long teid;

	private int userprofileID;
	
	private long projectID;
	
	private long clientID;
	
	@JsonSerialize(using = JsonDateSerializer.class)
	@JsonDeserialize(using = JsonDateDeserializer.class)
	private Date entryDate;
	
	private String description;
	
	private FluancePGInterval worktime;
	
	public TimeEntry() {}

	public TimeEntry(long teid, int userprofileID, int projectID, String description, Date entryDate, PGInterval worktime, int clientID) {
		this.teid = teid;
		this.userprofileID = userprofileID;
		this.projectID = projectID;
		this.clientID = clientID;
		this.description = description;
		this.entryDate = entryDate;
		try {
			this.worktime = new FluancePGInterval(worktime.getValue());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public Long getId() {
		return teid;
	}
	
	public int getUserprofileID() {
		return userprofileID;
	}

	public void setUserprofileID(int userprofileID) {
		this.userprofileID = userprofileID;
	}
	
	public long getProjectID() {
		return projectID;
	}

	public void setProjectID(long projectID) {
		this.projectID = projectID;
	}
	
	public long getClientID() {
		return clientID;
	}

	public void setClientID(long clientID) {
		this.clientID = clientID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	
	public FluancePGInterval getWorktime() {
		return worktime;
	}
	
	public void setWorktime(FluancePGInterval worktime) {
		this.worktime = worktime;
	}

	@Override
	public boolean isNew() {
		// TODO Handle this in the future in the controller
		return true;
	}
}