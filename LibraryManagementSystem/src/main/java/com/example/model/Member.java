package com.example.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="member")
public class Member {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int memid;
	
	@Column
	String firstName;
	
	@Column
	String lastName;
	
	
    @OneToMany(mappedBy="members")
    @JsonIgnore
    List<BookDetail> bookdetail;
	
	@Column
	String email;
		
	@Column
	Date dateOfBirth;
	
	@Column
	String contact;
	
	@Enumerated(EnumType.STRING)
    private Gender gender;

	public List<BookDetail> getBookdetail() {
		return bookdetail;
	}

	public void setBookdetail(List<BookDetail> bookdetail) {
		this.bookdetail = bookdetail;
	}

	public int getMemid() {
		return memid;
	}

	public void setMemid(int memid) {
		this.memid = memid;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}



	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}
	
}
