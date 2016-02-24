package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Fine;

public interface FineRepository extends JpaRepository<Fine, Integer> {
  
}
