package com.example.model;

import java.util.HashMap;
import java.util.Map;

public class MappingsConfig {
	// Maps a domain class name with the corresponding table name in the database
	public static final Map<String, String> TABLE_NAMES = new HashMap<>();
	static {
		TABLE_NAMES.put("UserProfile", "timetracker.userprofile");
		TABLE_NAMES.put("Project", "timetracker.project");
		TABLE_NAMES.put("Task", "timetracker.task");
		TABLE_NAMES.put("Client", "timetracker.client");
		TABLE_NAMES.put("TimeEntry", "timetracker.timeentry");
	}
}