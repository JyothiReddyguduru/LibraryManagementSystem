package com.example;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	DataSource datasource;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.httpBasic().and().authorizeRequests().antMatchers("/").permitAll()
		.antMatchers("/admin/**").hasAuthority("ADMIN")
		.antMatchers("/member/**").hasAuthority("USER")
		.antMatchers("/clerk/**").hasAuthority("CLERK")
				.and().logout().invalidateHttpSession(true)
                .logoutUrl("/logout").logoutSuccessUrl("/index.html")
				.and().csrf().disable();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		
//use .passwordEncoder(passwordEncoder()) method to hash the entered password
		auth.jdbcAuthentication().dataSource(datasource)
		.passwordEncoder(passwordEncoder())
				.usersByUsernameQuery("select user_name, password,true as enabled from user where user_name=?")
				.authoritiesByUsernameQuery("select user_name, roles from user where user_name=?")
				.rolePrefix("");

	}
	
	@Bean
	public PasswordEncoder passwordEncoder(){
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}
}