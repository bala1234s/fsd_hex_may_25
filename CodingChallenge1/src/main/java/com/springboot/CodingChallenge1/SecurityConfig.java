package com.springboot.CodingChallenge1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
		http.csrf((csrf)->csrf.disable())
		.authorizeHttpRequests(authorize -> authorize
			.requestMatchers("api/user/signup").permitAll()
			.requestMatchers("api/user/get-token").permitAll()
			.requestMatchers("api/doctor/add").permitAll()
			.requestMatchers("api/patient/add").permitAll()
			.requestMatchers("api/appointment/add").permitAll()
			
			.requestMatchers("api/appointment/doctor").hasAuthority("DOCTOR")
			.requestMatchers("api/medical-history/get/{patientId}").hasAuthority("DOCTOR")
			.anyRequest().authenticated())
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
			.httpBasic(Customizer.withDefaults());
		
		return http.build();
		
		
		
	}

	@Bean
	PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
		return auth.getAuthenticationManager();
		
	}
	
}

