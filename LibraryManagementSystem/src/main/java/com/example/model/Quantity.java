package com.example.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="quantity")
public class Quantity {
    
	@Id
	String accountId;
	
	@ManyToOne
	@JsonIgnore
	Book book;
	
	@OneToMany(fetch = FetchType.EAGER,orphanRemoval=true,mappedBy="quantity")
	@JsonIgnore
	List<BookDetail> bookdetail;
	
	@Enumerated(EnumType.STRING)
    private Status status;

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	
	

	public List<BookDetail> getBookdetail() {
		return bookdetail;
	}

	public void setBookdetail(List<BookDetail> bookdetail) {
		this.bookdetail = bookdetail;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	
}
