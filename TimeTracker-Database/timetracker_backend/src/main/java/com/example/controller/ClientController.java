package com.example.controller;

import java.security.InvalidKeyException;
import java.util.List;

import javax.management.openmbean.KeyAlreadyExistsException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringStartApplication;
import com.example.model.Client;
import com.example.repository.ClientRepository;
import com.example.repository.UserProfileRepository;
import com.example.utils.LoginHelper;

@RestController
@RequestMapping("/clients")
public class ClientController {

	@Autowired
	ClientRepository clientRepository;
	@Autowired
	UserProfileRepository userprofileRepository;

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> findAll( HttpServletRequest request ) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				List<Client> clients = (List<Client>) clientRepository.findAll();
				return new ResponseEntity<>(clients, HttpStatus.OK);
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
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> findById(@PathVariable("id") Long id, HttpServletRequest request ) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				Client client = clientRepository.findOne(id);
				return new ResponseEntity<>(client, HttpStatus.OK);
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
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Client client, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				if (userprofileRepository.checkIfAdmin(userID)) {
					clientRepository.createClient(client);
					return new ResponseEntity<>(client, HttpStatus.CREATED);
				} else {
					return new ResponseEntity<>("Not Permitted!", HttpStatus.UNAUTHORIZED);
				}
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (KeyAlreadyExistsException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable long id, @RequestBody Client client, HttpServletRequest request) throws InvalidKeyException {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				if (userprofileRepository.checkIfAdmin(userID)) {
					Client oldClient = clientRepository.findOne(id);
					if (oldClient == null) {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				} else {
					return new ResponseEntity<>("Not Permitted!", HttpStatus.UNAUTHORIZED);
				}
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
			clientRepository.updateClient(id, client.getClientName());
			return new ResponseEntity<>(client, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") int id, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				if (userprofileRepository.checkIfAdmin(userID)) {
					clientRepository.delete(id);
					return new ResponseEntity<>(id, HttpStatus.ACCEPTED);
				} else {
					return new ResponseEntity<>("Not Permitted!", HttpStatus.UNAUTHORIZED);
				}
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}