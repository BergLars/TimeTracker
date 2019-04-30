package com.example.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.model.SQLStatements;
import com.example.model.Task;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;

@Component
public class TaskRepository extends JdbcRepository<Task, Long> {
	public TaskRepository() {
		this("task");
	}

	public TaskRepository(String tableName) {
		super(ROW_MAPPER, ROW_UNMAPPER, new TableDescription(tableName, null, "id"));
	}

	public static final RowMapper<Task> ROW_MAPPER = new RowMapper<Task>() {
		public Task mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Task(rs.getLong("id"), rs.getString("taskName"), rs.getLong("projectID"));
		}
	};

	public static final RowUnmapper<Task> ROW_UNMAPPER = new RowUnmapper<Task>() {
		public Map<String, Object> mapColumns(Task task) {
			Map<String, Object> mapping = new LinkedHashMap<String, Object>();
			mapping.put("id", task.getId());
			mapping.put("taskName", task.getTaskName());
			mapping.put("projectID", task.getProjectID());

			return mapping;
		}
	};

	public Task createTask(Task task) {
		getJdbcOperations().update(SQLStatements.CREATE_TASK, 
				task.getTaskName(),
				task.getProjectID());
		return task;
	}

	public void updateTask(long task_id, String taskName, long project_id) {
		getJdbcOperations().update(SQLStatements.UPDATE_TASK_BY_ID, taskName, project_id, task_id);
	}

	public int delete(int id) {
		return getJdbcOperations().update(SQLStatements.DELETE_TASK, id);
	}
}