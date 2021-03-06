package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Book;


public interface BookRepository extends JpaRepository<Book, Integer> {

	 @Query(value="select book.title from Book book where book.title LIKE :title||'%'")
	public List<String> findByTitBook(@Param("title") String title);
	
	public Book findByTitle(String title);
	public Book findByAuthor(String author);
	
}
