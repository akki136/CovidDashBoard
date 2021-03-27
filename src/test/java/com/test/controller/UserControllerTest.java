package com.test.controller;

import java.util.ArrayList;
import java.util.List;



import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.Utility.MockedDataSet;
import com.test.controller.UserController;
import com.test.serviceImpl.UserServiceImpl;

@DisplayName("User Controller")
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

	@InjectMocks
	UserController controller;

	@Mock
	UserServiceImpl userImpl;

	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}

	@Test
	@DisplayName("get All user accounts registered API Test")
	public void getAllUserAccountsTest()
	{
		List<UserInfo> dataSet =MockedDataSet. getMockedData();
		Mockito.when(userImpl.getUserAccountList()).thenReturn(dataSet);
		ResponseEntity<List<UserInfo>>  responseEntity= controller.getAllUserAccounts();
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.OK);
		Assertions.assertNotNull(responseEntity.getBody());
		Assertions.assertEquals(responseEntity.getBody(),dataSet);
		Assertions.assertEquals(responseEntity.getBody().size(),1);
	}
	
	@Test
	@DisplayName("get All user accounts registered API Test If No user registered")
	public void getAllUserAccountsIfNoDataTest()
	{
		List<UserInfo> dataSet = new ArrayList<>();
		Mockito.when(userImpl.getUserAccountList()).thenReturn(dataSet);
		ResponseEntity<List<UserInfo>>  responseEntity= controller.getAllUserAccounts();
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.OK);
		Assertions.assertNotNull(responseEntity.getBody());
		Assertions.assertEquals(responseEntity.getBody(),dataSet);
		Assertions.assertEquals(responseEntity.getBody().size(),0);
	}
	
	@Test
	@DisplayName("get  user account By UserId")
	public void getUserAccountByUserIdTest()
	{
		String user="test";
		List<UserInfo> dataSet = MockedDataSet. getMockedData();
		Mockito.when(userImpl.getAccountByUserId(user)).thenReturn(dataSet.get(0));
		ResponseEntity<UserInfo>  responseEntity= controller.getUserAccountByUserId(user);
		Assertions.assertEquals(user,responseEntity.getBody().getUserName());
	}

	
	@Test
	@DisplayName("needs to return error if user do not exist in system")
	public void getUserAccountByUserIdIfNotExistTest()
	{
		String user="test";
		Mockito.when(userImpl.getAccountByUserId(user)).thenReturn(null);
		ResponseEntity<String>  responseEntity= controller.getUserAccountByUserId(user);
		Assertions.assertNotEquals(responseEntity.getStatusCode(),HttpStatus.OK);
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.NOT_FOUND);
		Assertions.assertEquals("Account not Found",responseEntity.getBody());
	}
	
	@Test
	@DisplayName("user should logged In")
	public void loingUserTest()
	{
		String user="test";
		List<UserInfo> dataSet =MockedDataSet. getMockedData();
		Mockito.when(userImpl.loginUser(dataSet.get(0).getUserName(), dataSet.get(0).getPassword())).thenReturn(dataSet.get(0));
		ResponseEntity<UserInfo>  responseEntity= controller.loginUser(dataSet.get(0));
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.OK);
		Assertions.assertEquals(responseEntity.getBody(),dataSet.get(0));
	}
	
	@Test
	@DisplayName("user logged In Failed")
	public void loginUserFailedTest()
	{
		String user="test";
		List<UserInfo> dataSet = MockedDataSet.getMockedData();
		Mockito.when(userImpl.loginUser(dataSet.get(0).getUserName(), dataSet.get(0).getPassword())).thenReturn(null);
		ResponseEntity<String>  responseEntity= controller.loginUser(dataSet.get(0));
		Assertions.assertNotEquals(responseEntity.getStatusCode(),HttpStatus.OK);
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.EXPECTATION_FAILED);
		Assertions.assertEquals("Login Failed",responseEntity.getBody());
	}
	
	@Test
	@DisplayName("register user if  not exist in system")
	public void registerUserTest()
	{
		String user="test";
		Status status=MockedDataSet.getMockedStatus(user);
		List<UserInfo> dataSet = MockedDataSet.getMockedData();
		Mockito.when(userImpl.addUser(dataSet.get(0))).thenReturn(status);
		ResponseEntity<Status>  responseEntity= controller.addUserAccount(dataSet.get(0));
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.CREATED);
		Assertions.assertEquals(responseEntity.getBody().getMsg(),"Account for userId ::"+user+" created ");
	
	}
	
	
	@Test
	@DisplayName("send error on register user if already   exist in system")
	public void registerUserAlreadyExistTest()
	{
		String user="test";
		Status status=MockedDataSet.getMockedFailedStatus(user);
		List<UserInfo> dataSet = MockedDataSet.getMockedData();
		Mockito.when(userImpl.addUser(dataSet.get(0))).thenReturn(status);
		ResponseEntity<Status>  responseEntity= controller.addUserAccount(dataSet.get(0));
		Assertions.assertEquals(responseEntity.getStatusCode(),HttpStatus.NOT_ACCEPTABLE);
		Assertions.assertEquals(responseEntity.getBody().getMsg(),"Account already exist for UserId "+user);
	
	}
	
	
}
