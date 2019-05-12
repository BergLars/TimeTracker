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
import com.example.model.Project;
import com.example.repository.ProjectRepository;
import com.example.utils.LoginHelper;

@RestController
@RequestMapping("/projects")
public class ProjectController {

	@Autowired
	ProjectRepository projectRepository;

	@CrossOrigin(origins = SpringStartApplication.CORS_ORIGINS)
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> findAll( HttpServletRequest request ) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				List<Project> projects = (List<Project>) projectRepository.findAll();
				return new ResponseEntity<>(projects, HttpStatus.OK);
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
	public ResponseEntity<?> findById(@PathVariable("id") int id, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				Project project = projectRepository.getProjectByID((long)id);
				return new ResponseEntity<>(project, HttpStatus.OK);
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
	public ResponseEntity<?> create(@RequestBody Project project, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				projectRepository.createProject(project);
				return new ResponseEntity<>(project, HttpStatus.CREATED);
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
	public ResponseEntity<?> update(@PathVariable long id, @RequestBody Project project, HttpServletRequest request) throws InvalidKeyException {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				projectRepository.updateProject(id, project.getProjectName(), project.getProjectOwner());
				return new ResponseEntity<>(project, HttpStatus.OK);
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
	public ResponseEntity<?> delete(@PathVariable("id") int id, HttpServletRequest request) {
		try {
			long userID = LoginHelper.getUserId(request.getHeader("Authorization"));
			boolean isValid = LoginHelper.validateJWT(request.getHeader("Authorization"), userID);
			if (isValid) {
				projectRepository.delete(id);
				return new ResponseEntity<>(id, HttpStatus.ACCEPTED);
			} else {
				return new ResponseEntity<>("Invalid authorization", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}