package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int id;	
	
	@Column(unique=true)
	String userName;
	
	 @JsonIgnore
	@Column
	String password;
	
	@Column
	String roles;
	
  /*  @OneToOne
    Member member;*/
/*
	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
		System.out.println("\n\nggg");
	}

	@JsonProperty(access=Access.WRITE_ONLY)
	public String getPassword() {
		return password;
	}

	@JsonProperty(access=Access.WRITE_ONLY)
	public void setPassword(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		password = passwordEncoder.encode(password);
		this.password = password;
	System.out.println("\n\nst"+password);
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}
	
}
