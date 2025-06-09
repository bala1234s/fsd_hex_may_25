package com.springboot.CodingChallenge1;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.springboot.CodingChallenge1.service.CustomUserDetailsService;
import com.springboot.CodingChallenge1.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String username = null; 
			String jwt = null;
			
			// To check authorization Header is present and Fetch the Token
			final String authorizationHeader = request.getHeader("Authorization");
			
			// To fetch the token from the authorizationHead <Bearer>
			
			if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				jwt = authorizationHeader.substring(7);
				username = jwtUtil.extractUsername(jwt); // To fetch username by the Token
				
			}
			
			
			
			if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				// To check the username in DB
			
				UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
				
				
				// To check/verify the token by username
				boolean isTokenValid = jwtUtil.verifyToken(jwt, username);
				if(isTokenValid) {
					/* Authnticate: Set up Authentication - Log this user IN, allow the API access */
					UsernamePasswordAuthenticationToken passwordAuthenticationToken =
							new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
					passwordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(passwordAuthenticationToken);
				}
			}
			
			filterChain.doFilter(request, response);
		}catch(Exception e) {
			throw e;
		}
	
		
	}
	

}
