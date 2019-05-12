package com.example.controller;

import java.nio.charset.CharacterCodingException;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringStartApplication;
import com.example.model.Client;
import com.example.model.Project;
import com.example.model.TimeEntry;
import com.example.model.UserProfile;
import com.example.repository.ClientRepository;
import com.example.repository.ProjectRepository;
import com.example.repository.TimeEntryRepository;
import com.example.repository.UserProfileRepository; 

@RestController
@RequestMapping("/export")
public class ExportController {
	@Autowired
	TimeEntryRepository timeEntryRepository;
	
	@Autowired
	ProjectRepository projectRepository;
	Project project;
	
	@Autowired
	UserProfileRepository userprofileRepository;
	UserProfile user, userEntries;
	
	@Autowired
	ClientRepository clientRepository;
	Client client;

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.GET, produces = {"text/csv;","application/json"})
	public ResponseEntity<?> exportCsv(@RequestParam String fromDate, @RequestParam String toDate, int userprofileID) throws ParseException, CharacterCodingException {
			HttpHeaders headers = new HttpHeaders();
			StringBuilder filenameBuilder = new StringBuilder();
			List<TimeEntry> timeEntries = timeEntryRepository.findAllByDates(fromDate, toDate, userprofileID);
			user = userprofileRepository.findUserByID((long) userprofileID);
			
			String fromDateHeader = fromDate.substring(8, 10)+"."+ fromDate.substring(5, 7)+"." + fromDate.substring(0, 4);
			String toDateHeader = toDate.substring(8, 10)+"."+ toDate.substring(5, 7)+"." + toDate.substring(0, 4);
			
			filenameBuilder
			.append("attachment; filename=")
			.append(user.getUserName())
			.append("_")
			.append(fromDateHeader)
			.append("-")
			.append(toDateHeader)
			.append(".csv");
			
			String filename = filenameBuilder.toString();
			
			headers.add(HttpHeaders.CONTENT_DISPOSITION, filename);
			headers.add(HttpHeaders.CONTENT_TYPE, "text/csv");
			
			String taskName = "Project name";
			String description = "Description";
			String entryDate = "Entry date";
			String workTime = "Work time";
			
			
			StringBuilder builder = new StringBuilder();
			builder.append("\"");
			builder.append(StringUtils.capitalize(description));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(entryDate));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(workTime));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(taskName));
			builder.append("\"\n");
 
	        for (TimeEntry timeEntry : timeEntries) {
	        	project = projectRepository.findOne((long) timeEntry.getProjectID());
				userEntries = userprofileRepository.findOne((long)timeEntry.getUserprofileID());
	        	
				builder
	            .append("\"")
	            .append(timeEntry.getDescription())
	            .append("\"|\"")
	            .append(timeEntry.getEntryDate())
	            .append("\"|\"")
	            .append(timeEntry.getWorktime())
	            .append("\"|\"")
	            .append(client.getClientName())
	            .append("\"|\"")
	            .append(project.getProjectName())
	            .append("\"|\"")
	            .append(project.getProjectName())
	            .append("\"\n");
	            
	        } 
	        
			ResponseEntity<?> response = ResponseEntity.ok()
					.headers(headers)
					.body(builder.toString());
			return response;
	}
	
	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = {"text/csv;","application/json"})
	public ResponseEntity<?> exportAllCsv(@RequestParam String fromDate, @RequestParam String toDate) throws ParseException, CharacterCodingException {
			HttpHeaders headers = new HttpHeaders();
			StringBuilder filenameBuilder = new StringBuilder();
			List<TimeEntry> timeEntries = timeEntryRepository.findAllEntriesByDates(fromDate, toDate);
			
			String fromDateHeader = fromDate.substring(8, 10)+"."+ fromDate.substring(5, 7)+"." + fromDate.substring(0, 4);
			String toDateHeader = toDate.substring(8, 10)+"."+ toDate.substring(5, 7)+"." + toDate.substring(0, 4);
			
			filenameBuilder
			.append("attachment; filename=")
			.append("all")
			.append("_")
			.append(fromDateHeader)
			.append("-")
			.append(toDateHeader)
			.append(".csv");
			
			String filename = filenameBuilder.toString();
			
			headers.add(HttpHeaders.CONTENT_DISPOSITION, filename);
			headers.add(HttpHeaders.CONTENT_TYPE, "text/csv");
			
			String description = "Description";
			String entryDate = "Entry date";
			String workTime = "Work time";
			String projectName = "Project name";
			String username = "Username";
			
			StringBuilder builder = new StringBuilder();
			builder.append("\"");
			builder.append(StringUtils.capitalize(description));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(entryDate));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(workTime));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(projectName));
			builder.append("\"|\"");
			builder.append(StringUtils.capitalize(username));
			builder.append("\"\n");
 
	        for (TimeEntry timeEntry : timeEntries) {
	        	project = projectRepository.findOne((long) timeEntry.getProjectID());
				userEntries = userprofileRepository.findOne((long)timeEntry.getUserprofileID());
	        	
				builder
	            .append("\"")
	            .append(timeEntry.getDescription())
	            .append("\"|\"")
	            .append(entryDate)
	            .append("\"|\"")
	            .append(timeEntry.getWorktime())
	            .append("\"|\"")
	            .append(client.getClientName())
	            .append("\"|\"")
	            .append(project.getProjectName())
	            .append("\"|\"")
	            .append(project.getProjectName())
	            .append("\"|\"")
	            .append(userEntries.getUserName())
	            .append("\"\n");
	        } 
	        
			ResponseEntity<?> response = ResponseEntity.ok()
					.headers(headers)
					.body(builder.toString());
			return response;
	}
}
