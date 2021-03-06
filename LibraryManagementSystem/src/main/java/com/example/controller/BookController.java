package com.example.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
//import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Status;
import com.example.model.Book;
import com.example.model.BookDetail;
import com.example.model.Category;
import com.example.model.Fine;
import com.example.model.Member;
import com.example.model.Quantity;
import com.example.model.User;
import com.example.repositories.BookDetailRepository;
import com.example.repositories.BookRepository;
import com.example.repositories.CategoryRepository;
import com.example.repositories.FineRepository;
import com.example.repositories.MemberRepository;
import com.example.repositories.QuantityRepository;
import com.example.repositories.UserRepository;

import javassist.expr.NewArray;

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
	QuantityRepository quantityrepository;
	@Autowired
	UserRepository userrepository;
	/*private String lastName;
	private String DateofBirth; */
	@RequestMapping("/admin/editfine/{id}")
	public Fine getFine(@PathVariable("id")int id)
	{
		return finerepository.findOne(id);
	}
	@RequestMapping("/admin/editf")
public HashMap<Object,Object>editfine(@RequestBody Fine fine)
{
	HashMap<Object,Object>returnmap=new HashMap<>();
	try
	{
		finerepository.save(fine);
		returnmap.put("status",true);
		
	}
	catch(Exception e)
	{
		returnmap.put("status",false);
	}
	return returnmap;
	
}
	@RequestMapping("/categories")
	public List<Category> getCategories() {
		return (List<Category>) categoryrepository.findAll();
	}
	@RequestMapping("/categories/{cat}")
	public List<Category>getcat(@PathVariable("cat") String cat)
	{
		return categoryrepository.findByName("%"+cat+"%");
	}
	@RequestMapping("/viewallbooks")
	public List<Book> getBooks(){
		return bookrepository.findAll();
	}
	
	/*@RequestMapping("/books")
public Page<Book> getbooks(@RequestBody HashMap<String , Integer> map ) {
	
	int pageCount= map.get("pageCount");
	int pageSize=map.get("pageSize");
	PageRequest pageRequest=new PageRequest(pageCount,pageSize);
  return (Page<Book>) bookrepository.findAll(pageRequest);
}
	*/
	
	
	//pagination
	@RequestMapping("/viewfines")
	public List<Fine>getFines()
	{
		return finerepository.findAll();
	}
	
	@RequestMapping("/books")
	public Page<Book> getbooks(@RequestParam("ps")int pageSize,@RequestParam("pc")int pc) {
		//pageSize-no of elements to be displayed
			int pageCount;
		if(pc==0)
		{
		 pageCount = 0;
		}
		else
		{
			pageCount=pc-1;
		}
		  
		PageRequest pageRequest=new PageRequest(pageCount,pageSize);
	  return (Page<Book>) bookrepository.findAll(pageRequest);
	}
		
	//viewing copies of a particular book
	@RequestMapping("/book/{bookid}")
	public Book get(@PathVariable("bookid") int bookid) {

		return bookrepository.findOne(bookid);
		
	}

	//viewing books of a particular category
		@RequestMapping("/viewcatbooks/book/{bookid}")
		public List<Book> getbooks(@PathVariable("bookid") int bookid){
			return (List<Book>)  categoryrepository.findBookByCatid(bookid);
		}
		
	
	
	@RequestMapping("/admin/deletecopy/{accountid}")
	public void delete(@PathVariable("accountid") String accountid) {
		
		Quantity qu=quantityrepository.findByAccountId(accountid);
        qu.setStatus(Status.Removed);
		quantityrepository.save(qu);        
		
	}
	
	

	@RequestMapping("/viewfine")
	public List<Fine> getfine() {
		return (List<Fine>) finerepository.findAll();
	}

	@RequestMapping("/books/{isbn}")
	public List<Book> getBooks(@PathVariable("isbn") int isbn) {
		return (List<Book>) bookrepository.findOne(isbn);
	}

	
	@RequestMapping("/member/{id}")
	public List<BookDetail> getBookDetails(@PathVariable("id") int id) {
		return (List<BookDetail>) bookdetailrepository.findOne(id);
	}

	@RequestMapping("/admin/addCategory")
	public HashMap<String, Object> addcategory(@RequestBody Category category) {
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
	
	@RequestMapping("/admin/editcategoryname")
	public HashMap<String, Object> ediyy(@RequestBody Category category) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		try{
		
		/*	System.out.println(category.getCategoryname());

			System.out.println(category.getCatid());*/
			categoryrepository.save(category);
			returnParams.put("status", true);
			returnParams.put("msg", "successfully edited Category!!");
			}
		catch(Exception e){
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to edit Category!!");
			
		}
		return returnParams;
		}

	
	@RequestMapping("/admin/BookEditing")
	public HashMap<String, Object> editbook(@RequestBody Book book) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();

		try {
			int i=0;
		//Category categorynamee=categoryrepository.findOne(categoryid);
			//System.out.println(categorynamee.getCategoryname());
			List<Quantity>qan=book.getQuantity();
			Iterator<Quantity>it=qan.iterator();
			while(it.hasNext())
			{
				Quantity q=(Quantity)it.next();
				q.setBook(book);
				i++;
			}
			book.setCopies(i);
		bookrepository.save(book);
		
			returnParams.put("status", true);
			returnParams.put("msg", "successfully edited Category!!");
		} catch (Exception e) {
			e.printStackTrace();
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to edit Category!!");
		}

		return returnParams;
	}
	
	@RequestMapping("/category/{catId}")
	public Category getcatname(@PathVariable("catId") int catId){
		Category catname=categoryrepository.findOne(catId);
		return catname;
	}
	
	
	@RequestMapping("/bookk/{bookId}")
	public HashMap<Object,Object> getbookname(@PathVariable("bookId") int bookId){
		Book bookname=bookrepository.findOne(bookId);
		HashMap<Object,Object>returnmap=new HashMap<>();
		returnmap.put("bookid",bookname.getBookid());
		returnmap.put("author",bookname.getAuthor());
		returnmap.put("isbn", bookname.getIsbn());
		returnmap.put("title",bookname.getTitle());
		returnmap.put("cats",bookname.getCats());
		returnmap.put("quantity",bookname.getQuantity());
		return returnmap;
		
	}
	
	
	@RequestMapping("/addfinerule")
	public HashMap<String, Object> addfinerules(@RequestBody Fine fine) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();

		try {
			finerepository.save(fine);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add Fine Rule!!");
		}

		return returnParams;
	}

	@RequestMapping("/admin/addBook")
	public HashMap<String, Object> addbook(@RequestBody Book book) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();

		try {

			int j = book.getCopies();
			List<Quantity> account = new ArrayList<Quantity>();
			int i = 1;
			while (i <= j) {

				Quantity a = new Quantity();

				UUID uuid = UUID.randomUUID();
				String randomNo = uuid.toString();
				randomNo = randomNo.replace("-", "");

				a.setAccountId(randomNo);
				a.setStatus(Status.Available);
				a.setBook(book);
				account.add(a);
				i++;
			}
			book.setQuantity(account);

			bookrepository.save(book);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add book!!!!!!");
		}

		return returnParams;
	}


	@RequestMapping("/searchbytitle/{title}")
	public Book searchbookbytitle(@PathVariable("title") String title) {
		return bookrepository.findByTitle(title);
	}

	
	
	
	/*@RequestMapping("/bookdetails")
	public List<BookDetail> bookdetail() {
		
		return (List<BookDetail>) bookdetailrepository.findAll();
		
	}
*/
	@RequestMapping("/clerk/bookdetails")
	public Page<BookDetail> gethistclerk(@RequestParam("ps")int pageSize,@RequestParam("pc")int pc) {
		//pageSize-no of elements to be displayed
			int pageCount;
		if(pc==0)
		{
		 pageCount = 0;
		}
		else
		{
			pageCount=pc-1;
		}
		  
		PageRequest pageRequest=new PageRequest(pageCount,pageSize);
	  return (Page<BookDetail>) bookdetailrepository.findAll(pageRequest);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/bookdetails/{memberid}")
	public List<BookDetail> bookdetail(@PathVariable("memberid") int memid) {
		return (List<BookDetail>) bookdetailrepository.findOne(memid);
	}

	@RequestMapping("/quantity")
	public List<Quantity> quantity() {
		return (List<Quantity>) quantityrepository.findAll();
	}
	
	@RequestMapping("/getusername/{id}")
	public Map<String,String> userName(@PathVariable("id")int id)
	{
		Member m=memberrespository.findOne(id);
		String name=m.getUser().getUserName();
		Map<String,String> returnMap =  new HashMap<>();
		returnMap.put("name", name);
		return returnMap;
	}

	@RequestMapping("/clerk/issue")
	public HashMap<String, Object> issubook(@RequestBody BookDetail bookdetail) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();

		try {

			Date today = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

			today = sdf.parse(sdf.format(today));
			bookdetail.setIssueDate(today);
			Calendar c = Calendar.getInstance();
			c.setTime(today); // Now use today date.
			c.add(Calendar.DATE, 5); // Adding 5 days
			Date after = c.getTime();
			bookdetail.setDueDate(after);
			String s = bookdetail.getQuantity().getAccountId();
			Quantity q = quantityrepository.findOne(s);
			q.setStatus(Status.Unavailable);
			quantityrepository.save(q);

			bookdetailrepository.save(bookdetail);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to issue!!!!!!");
			e.printStackTrace();
		}

		return returnParams;
	}

	@RequestMapping("/members")
	public List<Member> getMembers() {
		return (List<Member>) memberrespository.findAll();
	}

	@RequestMapping("/clerk/markabook/{bookid}")
	public BookDetail markbook(@PathVariable("bookid") int bookid) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		BookDetail bookdetail = bookdetailrepository.findOne(bookid);

		try {
			int fine;
			
			Date today = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

			today = sdf.parse(sdf.format(today));

			bookdetail.setReturnDate(today);
			String acc = bookdetail.getQuantity().getAccountId();
			Quantity qu = quantityrepository.findOne(acc);

			Long days = (bookdetail.getReturnDate().getTime()) - (bookdetail.getDueDate().getTime());
			days = days / 1000 / 60 / 60 / 24;

			if (days <= 0)
				fine = 0;
			else {
				int amount1 = finerepository.findOne(1).getAmount();
				int amount2 = finerepository.findOne(2).getAmount();
				int days1 = finerepository.findOne(1).getNumberOfDays();
				int days2 = finerepository.findOne(2).getNumberOfDays();
				if (days <= days1)
					fine = (int) (amount1 * days);
				else
					fine = (int) ((amount1 * days1) + (amount2 * (days - days1)));

			}

			bookdetail.setFine(fine);

			qu.setStatus(Status.Available);
			quantityrepository.save(qu);
			bookdetailrepository.save(bookdetail);

			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add Category!!");
		}

		return bookdetail;

	}
	
	

@RequestMapping("/searchbymember/{memid}")
public List<BookDetail>getDetails(@PathVariable("memid") int memid)
{
	Member member=memberrespository.findOne(memid);
	List<BookDetail>b= member.getBookdetail();
	List<BookDetail>add=new ArrayList<BookDetail>();
	Iterator<BookDetail>it=b.iterator();
	while(it.hasNext())
	{
		BookDetail book=(BookDetail)it.next();
		if(book.getReturnDate()==null)
			add.add(book);
	}
	return add;
}


@RequestMapping("/log")
public HashMap<String, String> loggedIn(){
	HashMap<String, String> returnparams=new HashMap<String, String>();
	if(!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) && SecurityContextHolder.getContext().getAuthentication().isAuthenticated()==true)
	{
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getName() );
		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		returnparams.put("name", username);
		returnparams.put("status", "true");	
	
	Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
	Boolean authorityuser = authorities.contains(new SimpleGrantedAuthority("USER"));
	Boolean authorityclerk = authorities.contains(new SimpleGrantedAuthority("CLERK"));
	Boolean auth = true;
	
	if(authorityuser==auth){
		
	returnparams.put("role", "user");
	}
	else
	if(authorityclerk==auth)
	returnparams.put("role", "clerk");
			
	else
	returnparams.put("role", "admin");
	}
	else
	{
		returnparams.put("status", "false");	
	}
	return returnparams;
}

@RequestMapping("/getProfile")
public Member getmyprofile(){

 String s=	SecurityContextHolder.getContext().getAuthentication().getName();  
 User user=userrepository.findByUserName(s);
 int j=user.getId();
 System.out.println(user);
 System.out.println(user.getPassword());
 Member result;

    result= memberrespository.findByUserId(j);
System.out.println(result);
 return result;
}


@RequestMapping("/admin/addcopy1/{bookid}")
public HashMap<String,Object>addcopy(@PathVariable("bookid") int bookid) {
	HashMap<String, Object> returnParams = new HashMap<String, Object>();
	try
	{
		Quantity qu=new Quantity();
		UUID uuid=UUID.randomUUID();
		String randomNo = uuid.toString();
		randomNo=randomNo.replace("-", "");
		
		qu.setAccountId(randomNo);					
		qu.setStatus(Status.Available);
		
		//Update number of copies for the particular book  
		Book book=bookrepository.findOne(bookid);
		int j=book.getCopies();
		j++;
		book.setCopies(j);
		qu.setBook(book);
		quantityrepository.save(qu);
		returnParams.put("status", true);
		
	} catch (Exception e) {
		returnParams.put("status", false);
		returnParams.put("msg", "Failed to add Category!!");
	}

	return returnParams;
}

@RequestMapping("/autosearchbytitle/{title}")
public List<String>getNames(@PathVariable("title") String title){
	return bookrepository.findByTitBook("%"+title+"%");
}

@RequestMapping("/viewmybooks")
public List<Map<String, Object>> getmybooks(){
	List<BookDetail>bookdetail;

	String s=	SecurityContextHolder.getContext().getAuthentication().getName();  
 User user=userrepository.findByUserName(s);
 int j=user.getId();
 
 bookdetail=memberrespository.findByUserId(j).getBookdetail();
 Iterator<BookDetail> it= bookdetail.iterator();
 List<Map<String,Object>> result = new ArrayList<>();
 while(it.hasNext()){
	 Map<String,Object> resultMap = new HashMap<>();
	 BookDetail b=(BookDetail)it.next();
	 String acc=b.getQuantity().getAccountId();

	 Quantity qu=quantityrepository.findByAccountId(acc);
	 int bookid=qu.getBook().getBookid();
    String title= bookrepository.findOne(bookid).getTitle();
    String author= bookrepository.findOne(bookid).getAuthor();
    resultMap.put("bookDetail", b);
    resultMap.put("title", title);
    resultMap.put("author",author);
   result.add(resultMap);
   
 }
 return result;
 
}


@RequestMapping("/book/category/{bookid}")
public Map<Object,Object>getbook(@PathVariable("bookid")int bookid)
{
	Map<Object,Object>returncat=new HashMap<>();
	Book b=bookrepository.findOne(bookid);
	List<String>cat=new ArrayList<>();
	List<Category>c=b.getCats();
	Iterator<Category>it=c.iterator();
	while(it.hasNext())
	{
		Category c1=(Category)it.next();
		String name=c1.getCategoryname();
		
		cat.add(name);
	}
	Set<String> uniqueCat = new HashSet<String>(cat);
returncat.put("Categories",uniqueCat);
return returncat;
}

@RequestMapping("/savemember")
public HashMap<String,Object> addmember(@RequestBody Member mem) {
	HashMap<String, Object> returnParams = new HashMap<String, Object>();
	
	try {
	
		mem.getUser().setRoles("USER");
		memberrespository.save(mem);
/*		((List<Member>) userrepository).add(mem);
*/		returnParams.put("status", true);
	} catch (Exception e) {
		returnParams.put("status", false);
		returnParams.put("msg", "Failed to Register the user!!!!!!");
	}

	return returnParams;
}


@RequestMapping("/editmember")
public HashMap<String,Object> editmember(@RequestBody Member mem) {
	HashMap<String, Object> returnParams = new HashMap<String, Object>();
	
	try {
	
				memberrespository.save(mem);
/*		((List<Member>) userrepository).add(mem);
*/		returnParams.put("status", true);
	} catch (Exception e) {
		returnParams.put("status", false);
		returnParams.put("msg", "Failed to Edit the user!!!!!!");
	}

	return returnParams;
}



}
