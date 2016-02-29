package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	public User findByUserName(String username);
	 
	/*public int findByMemberId(int i);
	@Query(value="SELECT user.id FROM `user`,`member` WHERE `member`.memid= :memID")
	Integer findUserId(@Param("memID") int memID);*/

}
