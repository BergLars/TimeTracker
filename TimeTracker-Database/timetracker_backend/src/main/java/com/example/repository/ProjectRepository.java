package com.example.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.model.Project;
import com.example.model.SQLStatements;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;

@Component
public class ProjectRepository extends JdbcRepository<Project, Long> {
	public ProjectRepository() {
		this("project");
	}

	public ProjectRepository(String tableName) {
		super(ROW_MAPPER, ROW_UNMAPPER, new TableDescription(tableName, null, "id"));
	}

	public static final RowMapper<Project> ROW_MAPPER = new RowMapper<Project>() {
		public Project mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Project(rs.getLong("pid"), rs.getString("projectName"), rs.getString("projectOwner"));
		}
	};

	public static final RowUnmapper<Project> ROW_UNMAPPER = new RowUnmapper<Project>() {
		public Map<String, Object> mapColumns(Project project) {
			Map<String, Object> mapping = new LinkedHashMap<String, Object>();
			mapping.put("pid", project.getId());
			mapping.put("projectName", project.getProjectName());
			mapping.put("projectOwner", project.getProjectOwner());

			return mapping;
		}
	};
	
	public void updateProject(long project_id, String projectName, String projectOwner){
		getJdbcOperations().update(SQLStatements.UPDATE_PROJECT_BY_ID, projectName, projectOwner, project_id);
	}

	public Project createProject(Project project){
		getJdbcOperations().update(SQLStatements.CREATE_PROJECT, 
				project.getProjectName(), 
				project.getProjectOwner());
		return project;
	}
	
	public Project getProjectByID(long id) {
		Project project = getJdbcOperations().queryForObject(SQLStatements.GET_PROJECT_BY_ID, ROW_MAPPER, id);
		return project;
	}
	
	public void delete(int id){
		getJdbcOperations().update(SQLStatements.DELETE_PROJECT, id);
	}
}