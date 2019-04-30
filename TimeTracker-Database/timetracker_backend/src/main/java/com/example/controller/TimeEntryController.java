package com.example.controller;

import java.security.InvalidKeyException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.management.openmbean.KeyAlreadyExistsException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringStartApplication;
import com.example.model.TimeEntry;
import com.example.repository.TimeEntryRepository;
import com.example.repository.UserProfileRepository;
import com.example.utils.LoginHelper;


@Controller
@RestController
@RequestMapping("/timeentries")
public class TimeEntryController {
	
	@Autowired
	TimeEntryRepository timeEntryRepository;
	@Autowired
	UserProfileRepository userprofileRepository;
	
//	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
//	@RequestMapping(value ="/{id}", method = RequestMethod.GET, produces="application/json")
//	public ResponseEntity<?> findById(@PathVariable long id, HttpServletRequest request) throws InvalidKeyException{
//		try{
//			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
//			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
//			
//			if (isValid) {
//				TimeEntry timeentry = timeEntryRepository.findOne(id);
//				return new ResponseEntity<>(timeentry, HttpStatus.OK);	
//			} else {
//				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
//			}
//		}catch(IllegalArgumentException e){
//			e.printStackTrace();
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}catch(Exception e){
//			e.printStackTrace();
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value ="", method = RequestMethod.GET, produces="application/json")
	public ResponseEntity<?> findByPersonID( HttpServletRequest request ) throws InvalidKeyException{
		try{
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				List<TimeEntry> timeentry = (List<TimeEntry>)timeEntryRepository.findByPersonID(userID);
				return new ResponseEntity<>(timeentry, HttpStatus.OK);	
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
			
		}catch(IllegalArgumentException e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody TimeEntry timeEntry, HttpServletRequest request)  throws InvalidKeyException{
		try{
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				TimeEntry entry = timeEntryRepository.createTimeEntry(timeEntry);
				return new ResponseEntity<>(entry, HttpStatus.CREATED);	
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		}catch(KeyAlreadyExistsException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}	
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable long id,  @RequestBody TimeEntry timeEntry, HttpServletRequest request)
			throws InvalidKeyException {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				timeEntryRepository.updateTimeEntry(
						timeEntry.getUserprofileID(), 
						timeEntry.getTaskID(), 
						timeEntry.getDescription(), 
						timeEntry.getEntryDate(), 
						timeEntry.getStartTime(), 
						timeEntry.getEndTime(), 
						timeEntry.getWorktime(),
						id);
				return new ResponseEntity<>(timeEntry, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") long id,HttpServletRequest request){
		try{
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				timeEntryRepository.delete(id);
				return new ResponseEntity<>( id, HttpStatus.ACCEPTED);	
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces="application/json")
	public ResponseEntity<?> findAll(){
		try{			
			List<TimeEntry> timeentry = (List<TimeEntry>)timeEntryRepository.findAll();
			return new ResponseEntity<>(timeentry, HttpStatus.OK);

		}catch(IllegalArgumentException e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
