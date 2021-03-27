package com.test.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.Dao.UserRepositoryDao;
import com.test.Exception.DemoTestException;
import com.test.entity.UserEntity;
import com.test.service.UserServiceI;

@Service
public class UserServiceImpl implements UserServiceI{

	@Autowired
	UserRepositoryDao  userRepository;

	Logger logger = LogManager.getLogger(UserServiceImpl.class);

	@Override
	public List<UserInfo> getUserAccountList() {
		List<UserInfo> demoTests=userRepository.findDemoDataList().parallelStream().map(demoTestEntity ->{
			UserInfo demoTest=new UserInfo();
		demoTest.setUserName(demoTestEntity.getUserName());
		demoTest.setEmail(demoTestEntity.getEmail());
		demoTest.setPassword(demoTestEntity.getPassword());
		demoTest.setName(demoTestEntity.getName());
			return demoTest;
		}).collect(Collectors.toList());
		return demoTests;
	}



	@Override
	public Status addUser(UserInfo demoTest) {
		String response="";
		Status status;
		try {
			status= userRepository.saveUser(demoTest);
		}  catch (Exception e) {
			logger.error("AddDemoAccount Error::{}",e.getMessage());
			response=e.getMessage();
			 status=new Status();
			status.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			status.setMsg(response);
			
		}

		return status;

	}

	


	@Override
	public UserInfo getAccountByUserId(String  userId)  {
		UserInfo userInfo=null;

		
		try {
			List<UserEntity> demoTestEntityList=userRepository.findAccountByUserId(userId);
			if(demoTestEntityList!=null)
			{
				UserEntity	userEntity=demoTestEntityList.get(0);
			    userInfo=new UserInfo();
				userInfo.setUserName(userEntity.getUserName());
				userInfo.setEmail(userEntity.getEmail());
				userInfo.setPassword(userEntity.getPassword());
				userInfo.setName(userEntity.getName());
			}
		}  catch (Exception e) {
			logger.error("getAccountByUserId Error::{}",e.getMessage());
		}



		return userInfo;
	}


	
	@Override
	public UserInfo loginUser(String  userId,String password)  {
		UserInfo demoTest=null;

		
		try {
			UserEntity demoTestEntity=userRepository.loginUser(userId,password);
			if(demoTestEntity!=null)
			{
			    demoTest=new UserInfo();
				demoTest.setUserName(demoTestEntity.getUserName());
				demoTest.setEmail(demoTestEntity.getEmail());
				demoTest.setPassword(demoTestEntity.getPassword());
				demoTest.setName(demoTestEntity.getName());
			}
		}  catch (Exception e) {
			logger.error("getAccountByAadhar Error::{}",e.getMessage());
		}
		//response="Ammount "+demoTest.getId()+" Credited to Account :: "+demoTest.getDepositAmount();


		return demoTest;
	}
	
}
