package com.test.Utility;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.entity.UserEntity;

public class MockedDataSet {

	public static List<UserInfo> getMockedData()
	{

		List<UserInfo> infos=new ArrayList<>();
		UserInfo userInfo=new UserInfo();
		userInfo.setName("test");
		userInfo.setUserName("test");
		userInfo.setEmail("abc@gmail.com");
		userInfo.setPassword("Akki1234");
		infos.add(userInfo);
		return infos;
	}
	
	public static List<UserEntity> getMockedEntityData()
	{

		List<UserEntity> infos=new ArrayList<>();
		UserEntity userInfo=new UserEntity();
		userInfo.setName("test");
		userInfo.setUserName("test");
		userInfo.setEmail("abc@gmail.com");
		userInfo.setPassword("Akki1234");
		infos.add(userInfo);
		return infos;
	}

	public static Status getMockedStatus(String userName)
	{

		Status status=new Status();
		status.setMsg("Account for userId ::"+userName+" created ");
		status.setHttpStatus(HttpStatus.CREATED);
		return status;
	}
	
	public  static Status getMockedFailedStatus(String userName)
	{

		Status status=new Status();
		status.setMsg("Account already exist for UserId "+userName);
		status.setHttpStatus(HttpStatus.NOT_ACCEPTABLE);
		return status;
	}
	
	
	public static String asJsonString(final Object obj) {
	    try {
	        return new ObjectMapper().writeValueAsString(obj);
	    } catch (Exception e) {
	        throw new RuntimeException(e);
	    }
	}
}
