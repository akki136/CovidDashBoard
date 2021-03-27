package com.test.service;

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
import com.test.Dao.UserRepositoryDao;
import com.test.Utility.MockedDataSet;
import com.test.controller.UserController;
import com.test.entity.UserEntity;
import com.test.serviceImpl.UserServiceImpl;

@DisplayName("User Controller")
@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

	@InjectMocks
	UserServiceImpl userServiceImpl;

	@Mock
	UserRepositoryDao userRepository;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("get All user accounts registered API Test")
	public void getUserAccountListTest()
	{
		List<UserEntity> dataSet =MockedDataSet. getMockedEntityData();
		Mockito.when(userRepository.findDemoDataList()).thenReturn(dataSet);
		List<UserInfo>  userList= userServiceImpl.getUserAccountList();
		Assertions.assertEquals(userList.get(0).getEmail(),dataSet.get(0).getEmail());
		Assertions.assertEquals(userList.get(0).getName(),dataSet.get(0).getName());
		Assertions.assertEquals(userList.size(),1);
	}
	
	@Test
	@DisplayName("get User Account By User Id")
	public void getAccountByUserIdTest() throws Exception
	{
		List<UserEntity> dataSet =MockedDataSet. getMockedEntityData();
		Mockito.when(userRepository.findAccountByUserId(dataSet.get(0).getUserName())).thenReturn(dataSet);
		UserInfo  userInfo= userServiceImpl.getAccountByUserId(dataSet.get(0).getUserName());
		Assertions.assertEquals(dataSet.get(0).getEmail(),userInfo.getEmail());
		Assertions.assertEquals(dataSet.get(0).getName(),userInfo.getName());
		
	}
	
	
	@Test
	@DisplayName("User Account don't exist in the System")
	public void getAccountByUserIdNotExistTest() throws Exception
	{
		List<UserEntity> dataSet =MockedDataSet. getMockedEntityData();
		Mockito.when(userRepository.findAccountByUserId(dataSet.get(0).getUserName())).thenReturn(null);
		UserInfo  userInfo= userServiceImpl.getAccountByUserId(dataSet.get(0).getUserName());
		Assertions.assertNull(userInfo);

		
	}
	
	@Test
	@DisplayName("User Logs In with valid credentials")
	public void loginUserWithValidCredentialTest() throws Exception
	{
		List<UserEntity> dataSet =MockedDataSet. getMockedEntityData();
		Mockito.when(userRepository.loginUser(dataSet.get(0).getUserName(), dataSet.get(0).getPassword())).thenReturn(dataSet.get(0));
		UserInfo  userInfo= userServiceImpl.loginUser(dataSet.get(0).getUserName(), dataSet.get(0).getPassword());
		Assertions.assertEquals(dataSet.get(0).getEmail(),userInfo.getEmail());
		Assertions.assertEquals(dataSet.get(0).getName(),userInfo.getName());
	}
	
	@Test
	@DisplayName("User Log In failed with inValid credentials")
	public void loginUserFailedWithInValidCredentialTest() throws Exception
	{
		List<UserEntity> dataSet =MockedDataSet. getMockedEntityData();
		Mockito.when(userRepository.loginUser(Mockito.anyString(),Mockito.anyString())).thenReturn(null);
		UserInfo  userInfo= userServiceImpl.loginUser(dataSet.get(0).getUserName(), dataSet.get(0).getPassword());
		Assertions.assertNull(userInfo);
	}
	

}
