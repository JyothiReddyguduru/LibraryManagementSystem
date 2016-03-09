package com.example.repositories;

import java.util.ArrayList;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Book;
import com.example.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
/*public List<Category> catlist = new ArrayList<Category>();*/
 List<Book>  findBookByCatid(int i);
 
 
 @Query(value="select cat from Category cat where cat.categoryname LIKE :name||'%'")
	public List<Category> findByName(@Param("name") String name);
}