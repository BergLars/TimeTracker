package com.example.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.GenericFilterBean;

public class HeadersFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", "*");

		if ("OPTIONS".equals(((HttpServletRequest) request).getMethod())) {
			// CORS "pre-flight" request
			((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		}
		chain.doFilter(request, response);
	}

}
