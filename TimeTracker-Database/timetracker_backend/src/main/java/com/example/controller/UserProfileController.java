package com.example.controller;

import java.security.InvalidKeyException;
import java.security.KeyException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringStartApplication;
import com.example.model.TimeEntry;
import com.example.model.UserProfile;
import com.example.repository.UserProfileRepository;
import com.example.utils.GenericResponsePayload;
import com.example.utils.LoginHelper;

@RestController
@RequestMapping("/userprofile")
public class UserProfileController {
	@Autowired
	UserProfileRepository userprofileRepository;
	@Autowired
	private ShaPasswordEncoder passwordEncoder;
	private String salt = "36ebe205bcdfc499a25e6923f4450fa8";

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> findAll(HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				List<UserProfile> personList = (List<UserProfile>) userprofileRepository.findAll();
				
				// Checks if user has admin rights. If yes, all users will be sent, with "emptying" the passwords
				if (userprofileRepository.checkIfAdmin(userID)) {
					for (int i = 0; i < personList.size(); i++) {
						UserProfile userProfile = personList.get(i);
						userProfile.setPassword("");
					}				
					return new ResponseEntity<>(personList, HttpStatus.OK);
				} else {
					//If user doesn't have admin rights, his own userprofile will be filtered from the whole list and put into another list
					//which will be sent, when this endpoint will be called
					List<UserProfile> userprofile = new ArrayList<UserProfile>();
					for (int i = 0; i < personList.size(); i++) {
						UserProfile person = personList.get(i);
						if ((person.getId()) == userID ) {
							userprofile.add(person);
							person.setPassword("");
						}
					}
					return new ResponseEntity<>(userprofile, HttpStatus.OK);	
				}
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> findByID( HttpServletRequest request ) throws KeyException {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			UserProfile userprofile = userprofileRepository.findUserByID(userID);
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				userprofile.setPassword("");
				return new ResponseEntity<UserProfile>(userprofile, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody UserProfile userProfile, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				String currentPass = passwordEncoder.encodePassword(salt+userProfile.getPassword(), "");
				UserProfile newUserProfile = new UserProfile(userProfile.getId(), 
						userProfile.getUserName(), 
						userProfile.getName(),
						currentPass, 
						userProfile.isAdmin());
				userprofileRepository.createUserProfile(newUserProfile);
				return new ResponseEntity<>(newUserProfile, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
			return new ResponseEntity<>("User already exists !", HttpStatus.CONFLICT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Internal server error !", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@RequestBody UserProfile userProfile, HttpServletRequest request)
			throws InvalidKeyException {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				UserProfile oldUserProfile = userprofileRepository.findUserByID(userID);
				if (oldUserProfile == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				userprofileRepository.updatePerson(userID, 
						userProfile.getUserName(), 
						userProfile.getName(),
						userProfile.getPassword(), 
						userProfile.isAdmin());
				return new ResponseEntity<>(userProfile, HttpStatus.OK);
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
	public ResponseEntity<?> delete(@PathVariable("id") long id, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			
			if (isValid) {
				userprofileRepository.deleteUser(id);
				return new ResponseEntity<>(id, HttpStatus.ACCEPTED);
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/updatePassword", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> updatePassword(HttpServletRequest request, @RequestParam String currentPassword, @RequestParam String newPassword, @RequestParam String confirmPassword) {
		try {
			long id = LoginHelper.getUserId(request.getHeader("Authorization"));
			UserProfile person = userprofileRepository.findUserByID(id);
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), id);
			
			if (!isValid) return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
						
				String currentPass = passwordEncoder.encodePassword(salt+currentPassword, "");
				String dbPassword = person.getPassword();
				if ( currentPassword.isEmpty() || newPassword.isEmpty() || confirmPassword.isEmpty()) {
					return new ResponseEntity<>("Please check if all the fields are filled in !", HttpStatus.PRECONDITION_FAILED);
				}
				
				if (newPassword.length() < 8 || confirmPassword.length() < 8) {
					return new ResponseEntity<>("Password length should be > 8 !", HttpStatus.PRECONDITION_FAILED);
				}
				
				if (! dbPassword.equals(currentPass)) {
					return new ResponseEntity<>("Password length should be > 8 !", HttpStatus.PRECONDITION_FAILED);
				}

				if (!newPassword.equals(confirmPassword)) {
					return new ResponseEntity<>("Wrong password !", HttpStatus.NOT_FOUND);
				}
				
				// Everything is ok, we can update the password
				String confirmPass = passwordEncoder.encodePassword(salt+confirmPassword, "");
				person.setPassword(confirmPass);
				int binary = userprofileRepository.updatePassword(id, confirmPass);
				return new ResponseEntity<>(binary, HttpStatus.OK);
			
			}catch (EmptyResultDataAccessException e) {
			GenericResponsePayload grp = new GenericResponsePayload();
			String msg = "No user found !";
			grp.setMessage(msg);
			return new ResponseEntity<>(grp, HttpStatus.NOT_FOUND);
		 }
		catch (IllegalArgumentException e) {
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