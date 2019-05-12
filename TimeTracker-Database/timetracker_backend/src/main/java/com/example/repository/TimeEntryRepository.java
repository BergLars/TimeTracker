package com.example.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.postgresql.util.PGInterval;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;


import com.example.model.SQLStatements;
import com.example.model.TimeEntry;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;

@Component
public class TimeEntryRepository extends JdbcRepository<TimeEntry, Long> {
	public static ProjectRepository taskRepository;
	
	public TimeEntryRepository() {
		this("timeentry");
	}

	public TimeEntryRepository(String tableName) {
		super(ROW_MAPPER, ROW_UNMAPPER, new TableDescription(tableName, null, "id"));
	}

	public static final RowMapper<TimeEntry> ROW_MAPPER = new RowMapper<TimeEntry>() {
		public TimeEntry mapRow(ResultSet rs, int rowNum) throws SQLException {
			
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
	        String dateInString = rs.getString("entrydate");
	        Date date;
	        try {

	            date = formatter.parse(dateInString);
	            
	            return new TimeEntry(rs.getLong("tid"), 
						rs.getInt("userprofile_id"), 
						rs.getInt("project_id"), 
						rs.getString("description"), 
						date, 
						(PGInterval) rs.getObject("worktime"), 
						rs.getInt("client_id"));

	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
	        
			return null;
		}
	};

	public static final RowUnmapper<TimeEntry> ROW_UNMAPPER = new RowUnmapper<TimeEntry>() {
		public Map<String, Object> mapColumns(TimeEntry timeentry) {
			Map<String, Object> mapping = new LinkedHashMap<String, Object>();
			mapping.put("tid", timeentry.getId());
			mapping.put("userprofile_id", timeentry.getUserprofileID());
			mapping.put("project_id", timeentry.getProjectID());			
			mapping.put("description", timeentry.getDescription());
			mapping.put("entrydate", timeentry.getEntryDate());
			mapping.put("worktime", timeentry.getWorktime());
			mapping.put("client_id", timeentry.getClientID());
			
			return mapping;
		}
	};

	public List<TimeEntry> findByPersonID(long id) {
		List<TimeEntry> entries = getJdbcOperations().query(SQLStatements.FIND_ENTRIES_BY_USERPROFILEID, ROW_MAPPER, id);
		return entries;
	}

	public TimeEntry createTimeEntry(TimeEntry timeEntry) {
		getJdbcOperations().update(SQLStatements.CREATE_ENTRY, 
				timeEntry.getUserprofileID(),
				timeEntry.getProjectID(), 
				timeEntry.getDescription(),
				timeEntry.getEntryDate(), 
				timeEntry.getWorktime(),
				timeEntry.getClientID());
		return timeEntry;
	}

	public int updateTimeEntry(long userprofile_id, long project_id, long client_id, String description, 
			Date entryDate, PGInterval worktime, long id) {
		int update = getJdbcOperations().update(SQLStatements.UPDATE_ENTRY_BY_ID, 
				userprofile_id, 
				project_id, 
				description, 
				entryDate, 
				worktime, 
				client_id,
				id);
		return update;
	}
	
	public List<TimeEntry> findAllByDates(String fromDate, String toDate, long userprofile_id) {
		return getJdbcOperations().query(SQLStatements.FIND_ENTRIES_BY_DATES, ROW_MAPPER, fromDate, toDate, userprofile_id);
	}
	
	public List<TimeEntry> findAllEntriesByDates(String fromDate, String toDate) {
		return getJdbcOperations().query(SQLStatements.FIND_ALL_ENTRIES_BY_DATES, ROW_MAPPER, fromDate, toDate);
	}

	public void deleteEntry(long id) {
		getJdbcOperations().update(SQLStatements.DELETE_ENTRY, id);
	}
}