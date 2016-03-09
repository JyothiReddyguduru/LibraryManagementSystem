package com.example.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import javax.persistence.JoinColumn;

@Entity
@Table(name="book")
public class Book {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int bookid;
	
    @JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
	            name = "books_category",
	            joinColumns={@JoinColumn(name = "book_id")},
	            inverseJoinColumns ={@JoinColumn(name="cat_id")}
	    )
	List<Category> cats;
	
	
	@Column(unique=true)
	String isbn;
	
	
		@Column
		String author;
		
	
		@Column(unique=true)
		String title;
		
		@Column
		int copies;
	
	@OneToMany(mappedBy = "book", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	List<Quantity> quantity;

		public List<Quantity> getQuantity() {
		return quantity;
	}


	public void setQuantity(List<Quantity> quantity) {
		this.quantity = quantity;
	}


		public int getBookid() {
			return bookid;
		}


		public void setBookid(int bookid) {
			this.bookid = bookid;
		}

        
		public List<Category> getCats() {
			return cats;
		}
        
		 @JsonProperty(access=Access.WRITE_ONLY)
       		public void setCats(List<Category> cats) {
			this.cats = cats;
		}


		public String getIsbn() {
			return isbn;
		}


		public void setIsbn(String isbn) {
			this.isbn = isbn;
		}


		public String getAuthor() {
			return author;
		}


		public void setAuthor(String author) {
			this.author = author;
		}


		public String getTitle() {
			return title;
		}


		public void setTitle(String title) {
			this.title = title;
		}


		public int getCopies() {
			return copies;
		}


		public void setCopies(int copies) {
			this.copies = copies;
		}
		
	

}
