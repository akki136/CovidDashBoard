package com.test.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.test.BO.Status;
import com.test.BO.UserInfo;

public interface UserServiceI {

	List<UserInfo> getUserAccountList();
	 UserInfo getAccountByUserId(String userId);
	ResponseEntity<Status> addUser(UserInfo userInfo);
	UserInfo loginUser(String userId, String password);
}
