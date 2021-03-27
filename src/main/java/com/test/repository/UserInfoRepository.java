package com.test.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.test.entity.UserEntity;

@Repository
public interface  UserInfoRepository extends CrudRepository<UserEntity,Long>{
  List<UserEntity> findByUserName(String userName);
  UserEntity findByUserNameAndPassword(String userName,String password);
}
