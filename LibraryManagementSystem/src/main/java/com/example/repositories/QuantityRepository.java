package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Quantity;


public interface QuantityRepository extends JpaRepository<Quantity, String>{

	public Quantity findByAccountId(String accountid);

}
