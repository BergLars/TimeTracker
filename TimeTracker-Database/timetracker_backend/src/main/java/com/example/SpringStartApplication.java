package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;

import com.example.filter.HeadersFilter;

@SpringBootApplication
public class SpringStartApplication extends SpringBootServletInitializer {
	
	public static final String CORS_ORIGINS = "http://localhost:4200, https://mojito.dev.fluance.net/timetracker, https://timetracker.fluance.net";

	public static void main(String[] args) {
		SpringApplication.run(SpringStartApplication.class, args);
	}

	@Bean
	public HeadersFilter headersFilter() {
		return new HeadersFilter();
	}
	
	@Bean
	public ShaPasswordEncoder passwordEncoder() {
		return new ShaPasswordEncoder(512);
	}
}