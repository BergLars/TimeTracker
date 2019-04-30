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
	
	private long taskID;
	
	private Date entryDate;
	
	private FluancePGInterval startTime;
	
	private FluancePGInterval endTime;
	
	private String description;
	
	private FluancePGInterval worktime;
	
	public TimeEntry() {}

	public TimeEntry(long teid, int userprofileID, int taskID, String description, Date entryDate, PGInterval startTime, PGInterval endTime, PGInterval worktime) {
		this.teid = teid;
		this.userprofileID = userprofileID;
		this.taskID = taskID;
		this.description = description;
		this.entryDate = entryDate;
		try {
			this.startTime = new FluancePGInterval(startTime.getValue());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			this.endTime = new FluancePGInterval(endTime.getValue());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
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
	
	public long getTaskID() {
		return taskID;
	}

	public void setTaskID(long taskID) {
		this.taskID = taskID;
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
	
	
	public FluancePGInterval getStartTime() {
		return startTime;
	}
	
	public void setStartTime(FluancePGInterval startTime) {
		this.startTime = startTime;
	}
	
	public FluancePGInterval getEndTime() {
		return endTime;
	}
	
	public void setEndtime(FluancePGInterval endTime) {
		this.endTime = endTime;
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