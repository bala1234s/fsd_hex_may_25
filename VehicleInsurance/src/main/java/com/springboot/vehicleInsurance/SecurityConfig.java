package com.springboot.vehicleInsurance;

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
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf((csrf)->csrf.disable())
		.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("api/customer/add").permitAll()
				.requestMatchers("api/user/signup").permitAll()
				.requestMatchers("api/officer/add").permitAll()
				.requestMatchers("api/policy/get-all").permitAll()
				.requestMatchers("api/user/get-token").authenticated()
				.requestMatchers("api/customer/get-one").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/vehicle/get-one/{customerId}").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/policy-holder/get/{customerId}").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/policy-holder/get-one/{customerId}/{policyId}").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/policy-holder/get-one/{customerId}/{vehicleId}").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/policy-holder/get-all").hasAuthority("OFFICER")
				.requestMatchers("api/policy-holder/approve").hasAuthority("OFFICER")
				.requestMatchers("api/add-on/get-all").hasAuthority("OFFICER")
				.requestMatchers("api/add-on/get-all/{policyHolderId}").hasAuthority("OFFICER")
				.requestMatchers("api/quote/send/{policyHolderId}").hasAuthority("OFFICER")
				.requestMatchers("api/quote/get-one/{policyHolderId}").hasAnyAuthority("CUSTOMER","OFFICER")
				.requestMatchers("api/payment/pay").hasAuthority("CUSTOMER")
				.requestMatchers("api/claim/request/{policyHolderId}").hasAuthority("CUSTOMER")
				.requestMatchers("api/claim/get-one").hasAuthority("CUSTOMER")
				.requestMatchers("api/vehicle/add/{customerId}").hasAuthority("CUSTOMER")
				.requestMatchers("api/policy/apply").hasAuthority("CUSTOMER")
				.requestMatchers("api/review/add/{customerId}/{policyId}").hasAuthority("CUSTOMER")
				.requestMatchers("api/policy/add").hasAuthority("OFFICER")
				.anyRequest().authenticated())
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
		.httpBasic(Customizer.withDefaults());
		
		return http.build();
		
	}
	
	@Bean
	PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); // Encode our password
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration auth ) throws Exception {
		return auth.getAuthenticationManager();
	}

	

}
