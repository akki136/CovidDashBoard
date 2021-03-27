package com.test.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.serviceImpl.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
@CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
@Api(value = "UserController", description = "REST Apis related to Crud Operation!!!!")
@RestController
@Validated
public class UserController {
	
	@Autowired
	UserServiceImpl userServiceImpl;

	@ApiOperation(value = "Get list of User Accounts  ", response = Iterable.class, tags = "getAllAccount")
	@RequestMapping(method = RequestMethod.GET, value = "/getAllUserAccounts")
	public ResponseEntity<List<UserInfo>> getAllUserAccounts() {
		try {

			return new ResponseEntity<>(userServiceImpl.getUserAccountList(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@ApiOperation(value = "Get Account By UserId", response = Iterable.class, tags = "getUserAccountByUserId")
	@GetMapping("/getUserAccountByUserId/{userId}")
	public ResponseEntity getUserAccountByUserId(@PathVariable("userId") String userId) {
		    UserInfo userInfo=userServiceImpl.getAccountByUserId(userId);

		if (userInfo!=null)
		{
			return new ResponseEntity<>(userInfo, HttpStatus.OK);
		} else {
			return new ResponseEntity("Account not Found",HttpStatus.NOT_FOUND);
		}
	}

	
	@ApiOperation(value = "Login User", response = Iterable.class, tags = "Login User")
	@PostMapping("/loginUser")
	public ResponseEntity loginUser(@Valid @RequestBody UserInfo userInfo) {
		    UserInfo demoTest=userServiceImpl.loginUser(userInfo.getUserName(), userInfo.getPassword());

		if (demoTest!=null)
		{
			return new ResponseEntity<>(demoTest, HttpStatus.OK);
		} else {
			return new ResponseEntity("Login Failed",HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "add User Account", response = Iterable.class, tags = "addUserAccount")
	@PostMapping("/AddAccountInfo")
	public ResponseEntity<Status> addUserAccount(@Valid @RequestBody UserInfo userInfo) {
		try {
			Status status=  userServiceImpl.addUser(userInfo);
			return new ResponseEntity<>(status, status.getHttpStatus());
			
		} catch (Exception e) {
			Status status=new Status();
			status.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			status.setMsg("Failed to add Account");
			return new ResponseEntity<>(status, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	

	

}
