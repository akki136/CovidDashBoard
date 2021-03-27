package com.test.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;

import com.test.Dao.UserRepositoryDao;
import com.test.entity.UserEntity;
@EnableAutoConfiguration
@TestConfiguration
@ContextConfiguration(classes = {UserRepositoryDao.class,UserEntity.class})
@TestPropertySource(locations="classpath:application.properties")
@ComponentScan(basePackages = {"com.test.repository","com.test.Dao"})
@EntityScan(basePackages = "com.test.entity")
@EnableJpaRepositories(basePackages = {"com.test.repository"})
public class Config {

	
	@Bean(name="entityManagerFactory")
	public LocalSessionFactoryBean sessionFactory() {
	    LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
	    return sessionFactory;
	} 
}
