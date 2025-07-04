package com.springboot.vehicleInsurance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
		http.csrf((csrf) -> csrf.disable())
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Prefight - Allows the permit all  
						.requestMatchers("api/customer/add").permitAll()
						.requestMatchers("api/customer/upload/profile-pic/{customerId}").permitAll()
						.requestMatchers("api/user/signup").permitAll()
						
						.requestMatchers("api/officer/add").permitAll()
						.requestMatchers("api/officer/get").hasAuthority("OFFICER")
						.requestMatchers("api/officer/update/{officerId}").hasAuthority("OFFICER")
						
						.requestMatchers("api/policy/get-all").permitAll()
						.requestMatchers("api/policy/get-all-v2").permitAll()
						.requestMatchers("api/policy/get-one/{policyId}").permitAll()

						.requestMatchers("api/user/get-token").permitAll()
						.requestMatchers("api/user/details").permitAll()

						.requestMatchers("api/customer/get-one").hasAnyAuthority("CUSTOMER", "OFFICER")
						.requestMatchers("api/customer/update/{customerId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/customer/update/pan/{customerId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/customer/update/aadhar/{customerId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/vehicle/get-one/{customerId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/vehicle/get").hasAuthority("CUSTOMER")
						.requestMatchers("api/vehicle/add/{customerId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/vehicle/update/{vehicleId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/vehicle/delete/{vehicleId}").hasAuthority("CUSTOMER")
						
						.requestMatchers("api/policy/apply").hasAuthority("CUSTOMER")
						.requestMatchers("api/policy/add").hasAuthority("OFFICER")
						.requestMatchers("api/policy/update/{policyId}").hasAuthority("OFFICER")
						.requestMatchers("api/policy/delete/{policyId}").hasAuthority("OFFICER")

						.requestMatchers("api/policy-holder/get/{customerId}").hasAnyAuthority("CUSTOMER", "OFFICER")
						.requestMatchers("api/policy-holder/get").hasAuthority("CUSTOMER")
						.requestMatchers("api/policy-holder/get-one/{customerId}/{policyId}")
						.hasAnyAuthority("CUSTOMER", "OFFICER")

						.requestMatchers("api/policy-holder/get-one/{customerId}/{vehicleId}")
						.hasAnyAuthority("CUSTOMER", "OFFICER")

						.requestMatchers("api/policy-holder/get-all").hasAuthority("OFFICER")
						.requestMatchers("api/policy-holder/getAll").hasAuthority("OFFICER")
						.requestMatchers("api/policy-holder/get-one-details/{policyHolderId}").hasAnyAuthority("CUSTOMER", "OFFICER")
						.requestMatchers("api/policy-holder/approve").hasAuthority("OFFICER")
						.requestMatchers("api/policy-holder/deactivate").hasAuthority("OFFICER")

						.requestMatchers("api/add-on/get-all").hasAuthority("OFFICER")
						.requestMatchers("api/add-on/get-all/{policyHolderId}").hasAuthority("OFFICER")

						.requestMatchers("api/addons/details/add").hasAuthority("OFFICER")
						.requestMatchers("api/addons/details/get-all").permitAll()
						.requestMatchers("api/addons/details/update/{id}").hasAuthority("OFFICER")
						.requestMatchers("api/addons/details/delete/{id}").hasAuthority("OFFICER")
						
						.requestMatchers("api/quote/send/{policyHolderId}").hasAuthority("OFFICER")
						.requestMatchers("api/quote/get-one/{policyHolderId}").hasAnyAuthority("CUSTOMER", "OFFICER")
						.requestMatchers("api/quote/get-addons").hasAnyAuthority("CUSTOMER", "OFFICER")

						.requestMatchers("api/payment/pay/{policyHolderId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/payment/get-all").hasAuthority("OFFICER")
						.requestMatchers("api/claim/request/{policyHolderId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/claim/upload-damage-pic/{policyHolderId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/claim/get-one").hasAuthority("CUSTOMER")
						.requestMatchers("api/claim/get-all").hasAuthority("OFFICER")
						.requestMatchers("api/claim/approve").hasAuthority("OFFICER")

						.requestMatchers("api/review/add/{customerId}/{policyId}").hasAuthority("CUSTOMER")
						.requestMatchers("api/review/get/{policyId}").permitAll() 
						.requestMatchers("api/review/get-all").permitAll() 

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
	AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
		return auth.getAuthenticationManager();
	}

}
