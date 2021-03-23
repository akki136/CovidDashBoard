package com.test.BO;

import org.springframework.http.HttpStatus;

public class Status {

	HttpStatus httpStatus;
	String msg;
	/**
	 * @return the httpStatus
	 */
	public HttpStatus getHttpStatus() {
		return httpStatus;
	}
	/**
	 * @param httpStatus the httpStatus to set
	 */
	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}
	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}
	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
