package com.test.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.test.entity.UserEntity;

public interface  UserInfoRepository extends CrudRepository<UserEntity,Long>{
  List<UserEntity> findByUserName(String userName);
  UserEntity findByUserNameAndPassword(String userName,String password);
}
