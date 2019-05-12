package com.example.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.model.Client;
import com.example.model.SQLStatements;
import com.example.model.UserProfile;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;

@Component
public class ClientRepository extends JdbcRepository<Client, Long> {
	public ClientRepository() {
		this("client");
	}

	public ClientRepository(String tableName) {
		super(ROW_MAPPER, ROW_UNMAPPER, new TableDescription(tableName, null, "id"));
	}

	public static final RowMapper<Client> ROW_MAPPER = new RowMapper<Client>() {
		public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Client(rs.getLong("cid"), 
					rs.getString("name"));
		}
	};

	public static final RowUnmapper<Client> ROW_UNMAPPER = new RowUnmapper<Client>() {
		public Map<String, Object> mapColumns(Client client) {
			Map<String, Object> mapping = new LinkedHashMap<String, Object>();
			mapping.put("cid", client.getId());
			mapping.put("name", client.getClientName());

			return mapping;
		}
	};
	
	public Client findClientByID(long id) {
		Client client = getJdbcOperations().queryForObject(SQLStatements.GET_CLIENT_BY_ID, ROW_MAPPER, id);
		return client;
	}
	
	public void updateClient(long client_id, String name){
		getJdbcOperations().update(SQLStatements.UPDATE_CLIENT_BY_ID, name, client_id);
	}

	public Client createClient(Client client){
		getJdbcOperations().update(SQLStatements.CREATE_CLIENT, 
				client.getClientName());

		return client;
	}
	
	public void delete(int id){
		getJdbcOperations().update(SQLStatements.DELETE_CLIENT, id);
	}
}