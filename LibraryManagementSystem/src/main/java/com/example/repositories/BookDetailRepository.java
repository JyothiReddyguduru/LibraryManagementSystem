package com.example.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.BookDetail;


public interface BookDetailRepository extends JpaRepository<BookDetail, Integer> {

}
 