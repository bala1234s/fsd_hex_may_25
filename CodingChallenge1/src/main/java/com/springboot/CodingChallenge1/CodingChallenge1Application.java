package com.springboot.CodingChallenge1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class CodingChallenge1Application {

	public static void main(String[] args) {
		SpringApplication.run(CodingChallenge1Application.class, args);
	}

}
