package com.test.Dao.Integration;

import java.util.List;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.Dao.UserRepositoryDao;
import com.test.Utility.MockedDataSet;
import com.test.config.Config;
import com.test.entity.UserEntity;
import com.test.repository.UserInfoRepository;




@DisplayName("User Dao Integration Test")
@Import(Config.class)
@RunWith(SpringRunner.class)

public class UserRepositoryDaoImplTest {

	@Autowired
	UserRepositoryDao userRepository;

	@Autowired
	UserInfoRepository userInfoRepository;


	@DisplayName("find By Id User Test")
	@Test
	@Transactional
	@Rollback(true)
	public void findByUserIdTest() throws Exception
	{

		List<UserInfo> userEntities = SaveUser();
		List<UserEntity> entities=userRepository.findAccountByUserId(userEntities.get(0).getUserName());
		Assertions.assertNotNull(entities.get(0));
		Assertions.assertEquals(userEntities.get(0).getUserName(),entities.get(0).getUserName());
	}
	

	@DisplayName("get list of Accounts Test")
	@Test
	@Transactional
	@Rollback(true)
	public void findDemoDataListTest() throws Exception
	{

		List<UserInfo> userEntities = SaveUser();
		List<UserEntity> entities=userRepository.findDemoDataList();
		Assertions.assertNotNull(entities.get(0));
		Assertions.assertEquals(userEntities.get(0).getUserName(),entities.get(0).getUserName());
	}

	@DisplayName("get Account By Id  Test")
	@Test
	@Transactional
	@Rollback(true)
	public void findByIdTest() throws Exception
	{

		List<UserInfo> userEntities = SaveUser();
		List<UserEntity> entities=	userRepository.findAccountByUserId(userEntities.get(0).getUserName());
		UserEntity entity=userRepository.findById(entities.get(0).getId());
		Assertions.assertNotNull(entity);
		Assertions.assertEquals(userEntities.get(0).getUserName(),entity.getUserName());
	}
	
	@DisplayName("login User Test")
	@Test
	@Transactional
	@Rollback(true)
	public void loginUserTest() throws Exception
	{

		List<UserInfo> userEntities = SaveUser();
		UserEntity entity=userRepository.loginUser(userEntities.get(0).getUserName(), userEntities.get(0).getPassword());
		Assertions.assertNotNull(entity);
		Assertions.assertEquals(userEntities.get(0).getUserName(),entity.getUserName());
	}
	
	
	@DisplayName("save User Test")
	@Test
	@Transactional
	@Rollback(true)
	public void saveUserTest() throws Exception
	{

		List<UserInfo> userEntities=MockedDataSet.getMockedData();
		Status status =userRepository.saveUser(userEntities.get(0));
		List<UserEntity> entities=	userRepository.findAccountByUserId(userEntities.get(0).getUserName());
		Assertions.assertNotNull(entities.get(0));
		Assertions.assertEquals(userEntities.get(0).getUserName(),entities.get(0).getUserName());
	}
	

	
	private List<UserInfo> SaveUser() {
		List<UserInfo> userEntities=MockedDataSet.getMockedData();
		Status status =userRepository.saveUser(userEntities.get(0));
		return userEntities;
	}

}
