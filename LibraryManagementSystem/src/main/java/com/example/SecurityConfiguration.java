package com.example;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	DataSource datasource;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.httpBasic().and().authorizeRequests().antMatchers("/").permitAll()
		.antMatchers("/admin/**").access("hasRole('ADMIN')")
		.antMatchers("/").access("hasRole('USER')")
		.antMatchers("/clerk/**").access("hasRole('CLERK')")
				.and().logout().invalidateHttpSession(false)
                .logoutUrl("/logout").logoutSuccessUrl("/index.html")
				.and().csrf().disable();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		

		auth.jdbcAuthentication().dataSource(datasource)
				.usersByUsernameQuery("select user_name, password,true as enabled from user where user_name=?")
				.authoritiesByUsernameQuery("select user_name, roles from user where user_name=?")
				.rolePrefix("");

	}
}