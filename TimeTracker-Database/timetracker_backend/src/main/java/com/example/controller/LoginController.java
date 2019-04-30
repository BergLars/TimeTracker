package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringStartApplication;
import com.example.model.UserCredentials;
import com.example.model.UserProfile;
import com.example.utils.GenericResponsePayload;
import com.example.utils.LoginHelper;

@RestController
@RequestMapping("/login")

public class LoginController {
	@Autowired
	LoginHelper loginHelper;

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> login(@RequestBody UserCredentials userCredentials) {
		try {
			String token = loginHelper.validateUserCredentials(userCredentials.getUserName(), userCredentials.getPassword());
			return new ResponseEntity<String>(token, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			GenericResponsePayload grp = new GenericResponsePayload();
			String msg = "No user found with username: " + userCredentials.getUserName();
			grp.setMessage(msg);
			return new ResponseEntity<>(grp, HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			GenericResponsePayload grp = new GenericResponsePayload();
			String msg = e.getMessage();
			grp.setMessage(msg);
			return new ResponseEntity<>(grp, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
}
