package com.test.BO;

import java.io.Serializable;

import javax.validation.constraints.Min;

import io.swagger.annotations.ApiModelProperty;

public class UserInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7964705731163204947L;
	@ApiModelProperty(required = true,dataType = "String")
	private String name;
	@ApiModelProperty(required = true,dataType = "String")
	private String userName;
	@ApiModelProperty(required = true,dataType = "String")
	private String password;
	@ApiModelProperty(required = true,dataType = "String")
	private String email;
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "DemoTest [name=" + name + ", userName=" + userName + ", password=" + password + ", email=" + email
				+ "]";
	}


	

	

}
