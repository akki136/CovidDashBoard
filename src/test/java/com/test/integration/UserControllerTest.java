package com.test.integration;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.test.Utility.MockedDataSet;
import com.test.config.Config;


@Import(Config.class)
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

	@Autowired
	private MockMvc mvc;
	
	
	@Test
	@Transactional
	@Rollback(true)
	public void getAllUserAccountTest()
	{
		 try {
			 AddMockedData();
			mvc.perform( MockMvcRequestBuilders
				      .get("/getAllUserAccounts")
				      .accept(MediaType.APPLICATION_JSON))
				      .andDo(print())
				      .andExpect(status().isOk())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.[0].name").exists())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.[0].name").isNotEmpty())
			    .andExpect(MockMvcResultMatchers.jsonPath("$.[0].name","test").isString())
		      .andExpect(MockMvcResultMatchers.jsonPath("$.[0].userName","test").isString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			}
			 

	@Test
	@Transactional
	@Rollback(true)
	public void getUserAccountById()
	{
		 try {
			 AddMockedData();
			mvc.perform( MockMvcRequestBuilders
				      .get("/getUserAccountByUserId/test")
				      .accept(MediaType.APPLICATION_JSON))
				      .andDo(print())
				      .andExpect(status().isOk())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.name").isNotEmpty())
			    .andExpect(MockMvcResultMatchers.jsonPath("$.name","test").isString())
		      .andExpect(MockMvcResultMatchers.jsonPath("$.userName","test").isString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			}


	@Test
	@Transactional
	@Rollback(true)
	public void userAccountNotExistTest()
	{
		 try {
			 
			 AddMockedData();
			mvc.perform( MockMvcRequestBuilders
				      .get("/getUserAccountByUserId/test1")
				      .accept(MediaType.APPLICATION_JSON))
				      .andDo(print())
				      .andExpect(status().isNotFound())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.name").doesNotExist());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			}
	

	@Test
	@Transactional
	@Rollback(true)
	public void createUserAccount()
	{
		 try {
			 mvc.perform( MockMvcRequestBuilders
				      .post("/AddAccountInfo")
				      .content(MockedDataSet.asJsonString(MockedDataSet.getMockedEntityData().get(0)))
				      .contentType(MediaType.APPLICATION_JSON)
				      .accept(MediaType.APPLICATION_JSON))
				      .andExpect(status().isOk());
			mvc.perform( MockMvcRequestBuilders
				      .get("/getUserAccountByUserId/test")
				      .accept(MediaType.APPLICATION_JSON))
				      .andDo(print())
				      .andExpect(status().isOk())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
				      .andExpect(MockMvcResultMatchers.jsonPath("$.name").isNotEmpty())
			    .andExpect(MockMvcResultMatchers.jsonPath("$.name","test").isString())
		      .andExpect(MockMvcResultMatchers.jsonPath("$.userName","test").isString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			}
	
	private void AddMockedData() throws Exception {
		mvc.perform( MockMvcRequestBuilders
			      .post("/AddAccountInfo")
			      .content(MockedDataSet.asJsonString(MockedDataSet.getMockedEntityData().get(0)))
			      .contentType(MediaType.APPLICATION_JSON)
			      .accept(MediaType.APPLICATION_JSON))
			      .andExpect(status().isOk());
	}
			 
		
	}
	

