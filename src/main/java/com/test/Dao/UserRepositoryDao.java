package com.test.Dao;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.NoResultException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.test.BO.Status;
import com.test.BO.UserInfo;
import com.test.entity.UserEntity;
import com.test.repository.UserInfoRepository;

@Repository
public class UserRepositoryDao {

	Logger logger = LogManager.getLogger(UserRepositoryDao.class);
	

	
	@Autowired
	UserInfoRepository userInfoRepository;
	
	
	
	public UserEntity findById(Long id)
	{
		return this.userInfoRepository.findOne(id);
	}

	public List<UserEntity> findDemoDataList()
	{
		
		
		List<UserEntity> result = 
				  StreamSupport.stream(this.userInfoRepository.findAll().spliterator(), false)
				    .collect(Collectors.toList());
	return result;
	
	}
	
	public List<UserEntity> findAccountByUserId(String userId) throws Exception
	{
		try
		{
		
	   return  this.userInfoRepository.findByUserName(userId);
		}catch(NoResultException ex )
		{
			return null;
		}
		catch(Exception ex )
		{
			throw new Exception(ex.getMessage());
		}
	}
	
	public UserEntity loginUser(String userId,String password) throws Exception
	{
		try
		{
		
	   return  this.userInfoRepository.findByUserNameAndPassword(userId, password);
		}catch(NoResultException ex )
		{
			return null;
		}
		catch(Exception ex )
		{
			throw new Exception(ex.getMessage());
		}
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Status saveUser(UserInfo userInfo)  {
		Status status=new Status();
		UserEntity deEntity=null;
		List<UserEntity> deEntityList=null;
		try {
			deEntityList = this.findAccountByUserId(userInfo.getUserName());
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		if (deEntityList != null&&!deEntityList.isEmpty()) {
			status.setHttpStatus(HttpStatus.NOT_ACCEPTABLE);
			status.setMsg("Account already exist for UserId "+userInfo.getUserName());
			return status;
		}
		deEntity=new UserEntity();
		BeanUtils.copyProperties(userInfo, deEntity);
     	this.userInfoRepository.save(deEntity);
	
		try {
			status.setHttpStatus(HttpStatus.OK);
			status.setMsg("Account for userId ::"+userInfo.getUserName()+" created ");
			return status;
		} catch (Exception e) {
			logger.error(e.getMessage());
			status.setHttpStatus(HttpStatus.NOT_ACCEPTABLE);
			status.setMsg(e.getMessage());
			return status;
		}
	
		

	}
	

	
}
