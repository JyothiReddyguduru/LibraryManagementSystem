package com.example.controller;

import java.util.HashMap;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Book;
import com.example.model.BookDetail;
import com.example.model.Category;
import com.example.model.Fine;
import com.example.model.Member;
import com.example.repositories.BookDetailRepository;
import com.example.repositories.BookRepository;
import com.example.repositories.CategoryRepository;
import com.example.repositories.FineRepository;
import com.example.repositories.MemberRepository;
import com.example.repositories.UserRepository;

@RestController
public class BookController {
	
	@Autowired
	BookRepository bookrepository;
	@Autowired
	CategoryRepository categoryrepository;
	@Autowired
	FineRepository finerepository;
	@Autowired
	BookDetailRepository bookdetailrepository;
	@Autowired
	MemberRepository memberrespository;
	@Autowired
	UserRepository userrepository;
	
	@RequestMapping("/categories")
		public List<Category> getCategories() {
		return (List<Category>) categoryrepository.findAll();
	}	
	
	@RequestMapping("/books")
	public List<Book> getBooks() {
		return (List<Book>) bookrepository.findAll();
	}	
	
	@RequestMapping("/viewfine")
	public List<Fine> getfine() {
		return (List<Fine>) finerepository.findAll();
	}	
	@RequestMapping("/members")
	public List<Member> getmember() {
		return (List<Member>) memberrespository.findAll();
	}	
	
	@RequestMapping("/bookdetail")
	public List<BookDetail> getbd() {
		return (List<BookDetail>) bookdetailrepository.findAll();
	}	
	/*@RequestMapping("/books/{isbn}")
	public List<Book> getBooks(@PathVariable("isbn") int isbn) {
		return (List<Book>) bookrepository.findOne(isbn);
	}	
	
	@RequestMapping("/issuebook/{id}")
	public List<BookDetail> getBookDetail(@PathVariable("id") int id) {
		return (List<BookDetail>) bookdetailrepository.findOne(id);
	}	*/
	
	@RequestMapping("/bookdetail/{memid}")
	public List<BookDetail> getBookDetails(@PathVariable("id") int id)
	{
		return (List<BookDetail>) bookdetailrepository.findOne(id);
	}
	
	@RequestMapping("/addCategory")
	public HashMap<String,Object> addcategory(@RequestBody Category category) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			categoryrepository.save(category);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add Category!!");
		}

		return returnParams;
	}
	
	@RequestMapping("/addbook")
	public HashMap<String,Object> addbook(@RequestBody Book book) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			bookrepository.save(book);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add book!!!!!!");
		}

		return returnParams;
	}
	
	@RequestMapping("/savemember")
	public HashMap<String,Object> addmember(@RequestBody Member mem) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			memberrespository.save(mem);
			((List<Member>) userrepository).add(mem);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to Register the user!!!!!!");
		}

		return returnParams;
	}
}
