package com.example.repositories;

import java.util.ArrayList;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Book;
import com.example.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
/*public List<Category> catlist = new ArrayList<Category>();*/
 List<Book>  findBookByCatid(int i);
}