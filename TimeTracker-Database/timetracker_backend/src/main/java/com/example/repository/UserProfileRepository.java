package com.example.repository;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.model.UserProfile;
import com.example.model.SQLStatements;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;

@Component
public class UserProfileRepository extends JdbcRepository<UserProfile, Long> {
	public UserProfileRepository() {
		this("userprofile");
	}

	public UserProfileRepository(String tableName) {
		super(ROW_MAPPER, ROW_UNMAPPER, new TableDescription(tableName, null, "id"));
	}

	public static final RowMapper<UserProfile> ROW_MAPPER = new RowMapper<UserProfile>() {
		public UserProfile mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new UserProfile(rs.getLong("id"), 
					rs.getString("username"), 
					rs.getString("name"), 
					rs.getString("password"), 
					rs.getBoolean("isAdmin"));
		}
	};

	public static final RowUnmapper<UserProfile> ROW_UNMAPPER = new RowUnmapper<UserProfile>() {
		public Map<String, Object> mapColumns(UserProfile userprofile) {
			Map<String, Object> mapping = new LinkedHashMap<String, Object>();
			mapping.put("id", userprofile.getId());
			mapping.put("username", userprofile.getUserName());
			mapping.put("name", userprofile.getName());
			mapping.put("password", userprofile.getPassword());
			mapping.put("isAdmin", userprofile.isAdmin());

			return mapping;
		}
	};

	public int updatePerson(long id, String username, String name, String password, Boolean isAdmin) 
			throws DataAccessException, UnsupportedEncodingException{
		int update = getJdbcOperations().update(SQLStatements.UPDATE_PERSON_BY_ID, username, name, URLDecoder.decode(password, "UTF-8"), isAdmin, id);
		return update;
	}
	
	public int updatePassword(long id, String password) throws DataAccessException, UnsupportedEncodingException {
		int update = getJdbcOperations().update(SQLStatements.UPDATE_PASSWORD_BY_ID, URLDecoder.decode(password, "UTF-8"), id);
		return update;
	}

	public UserProfile createUserProfile(UserProfile userProfile){
		getJdbcOperations().update(SQLStatements.CREATE_USER_PROFILE, 
				userProfile.getUserName(), 
				userProfile.getName(),
				userProfile.getPassword(), 
				userProfile.isAdmin());
		return userProfile;
	}

	public void deleteUser(long user_id){
		getJdbcOperations().update(SQLStatements.DELETE_PERSON_BY_UID, user_id);
	}
	
	public boolean checkIfAdmin(long id) {
		UserProfile person = getJdbcOperations().queryForObject(SQLStatements.FIND_PERSON_BY_ID, ROW_MAPPER, id);
		
		return person.isAdmin();
	}
	
	public UserProfile findByUsername(String username){
		UserProfile person = getJdbcOperations().queryForObject(SQLStatements.FIND_PERSON_BY_USERNAME, ROW_MAPPER, username);
		return person;
	}
}