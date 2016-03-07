package com.example.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="categories")
public class Category {

	@Id
@GeneratedValue(strategy=GenerationType.AUTO)
	int catid;
	
	@ManyToMany
	 @JoinTable(
	            name = "books_category",
	            joinColumns={@JoinColumn(name = "cat_id")},
	            inverseJoinColumns ={@JoinColumn(name="book_id")}
	    )
	List<Book>book;
	
	
	@Column
	String categoryname;


	public int getCatid() {
		return catid;
	}


	public void setCatid(int catid) {
		this.catid = catid;
	}


	public List<Book> getBook() {
		return book;
	}


	public void setBook(List<Book> book) {
		this.book = book;
	}


	public String getCategoryname() {
		return categoryname;
	}


	public void setCategoryname() {
		this.categoryname = categoryname;
	}

}
