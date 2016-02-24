package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Member;
public interface MemberRepository extends JpaRepository<Member, Integer> {

}
