package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Member;
public interface MemberRepository extends JpaRepository<Member, Integer> {
@Query(value="select mem from Member mem where mem.id=:userid")
public Member findByUserId(@Param("userid")int userid);
}
