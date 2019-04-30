package com.example.model;

public class SQLStatements {
	// ------------------------------------- USER
	public static final String FIND_PERSON_BY_ID = "SELECT * FROM "
			+ MappingsConfig.TABLE_NAMES.get("UserProfile") + " WHERE uid = ?";
	
	public static final String UPDATE_PERSON_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("UserProfile")
			+ " SET username = ?, name = ?, password = ?, isAdmin = ? WHERE uid = ?";
	
	public static final String UPDATE_PASSWORD_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("UserProfile")
			+ " SET password = ? WHERE uid = ?";

	public static final String CREATE_USER_PROFILE = "INSERT INTO " + MappingsConfig.TABLE_NAMES.get("UserProfile")
			+ " (username, firstname, password, isadmin) VALUES (?,?,?,?) ";

	public static final String DELETE_PERSON_BY_UID = "DELETE FROM "
			+ MappingsConfig.TABLE_NAMES.get("UserProfile") + " WHERE uid = ?";
	
	public static final String FIND_PERSON_BY_USERNAME = "SELECT * FROM " 
			+ MappingsConfig.TABLE_NAMES.get("UserProfile") + "WHERE username = ?";
	
	// ----------------------------------ENTRY
	public static final String FIND_ENTRIES_BY_USERPROFILEID = "SELECT COUNT(*) OVER() AS nb_records, * FROM "
			+ MappingsConfig.TABLE_NAMES.get("TimeEntry") + " WHERE userprofile_id = ?";
	
	public static final String CREATE_ENTRY = "INSERT INTO " + MappingsConfig.TABLE_NAMES.get("TimeEntry")
			+ " (userprofile_id, task_id, description, entrydate, starttime, endtime, worktime VALUES (?,?,?,?,?,?, ?)";

	public static final String UPDATE_ENTRY_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("TimeEntry")
			+ " SET userprofile_id = ?, task_id = ?, description = ?, entrydate = ?, starttime = ?, endtime = ?, worktime = ? where tid = ?";

	public static final String DELETE_ENTRY = "DELETE FROM " + MappingsConfig.TABLE_NAMES.get("TimeEntry")
			+ " WHERE id = ?";
	
	public static final String FIND_ENTRIES_BY_DATES = "SELECT * FROM " + MappingsConfig.TABLE_NAMES.get("TimeEntry")
	+ " WHERE entryDate::date between to_date(?, 'YYYY-MM-DD') and to_date(?, 'YYYY-MM-DD') AND userprofile_id = ? order by entryDate asc";

	public static final String FIND_ALL_ENTRIES_BY_DATES = "SELECT * FROM " + MappingsConfig.TABLE_NAMES.get("TimeEntry")
	+ " WHERE entryDate::date between to_date(?, 'YYYY-MM-DD') and to_date(?, 'YYYY-MM-DD') order by entryDate asc";

	// ---------------------------------- TASK
	public static final String UPDATE_TASK_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("Task")
			+ " SET taskname = ?, project_id = ? WHERE tid = ?";

	public static final String CREATE_TASK = "INSERT INTO " + MappingsConfig.TABLE_NAMES.get("Task")
			+ " (taskname, project_id) VALUES (?,?)";

	public static final String DELETE_TASK = "DELETE FROM " + MappingsConfig.TABLE_NAMES.get("Task") + " WHERE tid = ?";

	// ---------------------------------- PROJECT
	public static final String UPDATE_PROJECT_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("Project")
			+ " SET projectname = ?, projectowner = ?, client_id = ? WHERE pid = ?";

	public static final String CREATE_PROJECT = "INSERT INTO " + MappingsConfig.TABLE_NAMES.get("Project")
			+ " (projectName, projectowner, client_id) VALUES (?,?,?) ";

	public static final String DELETE_PROJECT = "DELETE FROM " + MappingsConfig.TABLE_NAMES.get("Project")
			+ " WHERE pid = ?";
	// ---------------------------------- CLIENT
	public static final String UPDATE_CLIENT_BY_ID = "UPDATE " + MappingsConfig.TABLE_NAMES.get("Client")
				+ " SET name = ? WHERE cid = ?";

	public static final String CREATE_CLIENT = "INSERT INTO " + MappingsConfig.TABLE_NAMES.get("Client")
				+ " (name) VALUES (?)";

	public static final String DELETE_CLIENT = "DELETE FROM " + MappingsConfig.TABLE_NAMES.get("Client")
				+ " WHERE cid = ?";
}