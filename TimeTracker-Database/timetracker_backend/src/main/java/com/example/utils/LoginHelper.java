package com.example.utils;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.model.UserProfile;
import com.example.repository.UserProfileRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.lang.Assert;;

@Component
public class LoginHelper {
	@Autowired
	private UserProfileRepository userprofileRepository;
	@Autowired
	private ShaPasswordEncoder passwordEncoder;
	private static String seed = "1234";
	private String salt = "36ebe205bcdfc499a25e6923f4450fa8";
	
	private static SecretKey secretKey;
	private Key signingKey;
	private SignatureAlgorithm signatureAlgorithm;
	
	public LoginHelper(){
		signatureAlgorithm = SignatureAlgorithm.HS256;

		secretKey = generateKey(signatureAlgorithm, new SecureRandom(seed.getBytes()));
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary( secretKey.toString());
		signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	}
	
	public String validateUserCredentials(String username, String password) throws Exception {
		UserProfile person = userprofileRepository.findByUsername(username);
		String dbPassword = person.getPassword();
		String userId = String.valueOf(person.getId());
		String encodedPassword = passwordEncoder.encodePassword(salt+password, "");
		if (dbPassword.equals(encodedPassword)) {
			String token = createJWT(userId, "Fluance", "Timetracker", 86400000);
			// TODO : remove that dirty hack
			return "{\"token\":\"" + token +"\"}";
		}
		throw new IllegalArgumentException("Invalid username or password !");
	}

	public static SecretKey generateKey(SignatureAlgorithm alg, SecureRandom random) {
		Assert.isTrue(alg.isHmac(), "SignatureAlgorithm argument must represent an HMAC algorithm.");
		
		byte[] bytes;
		switch (alg) {
		case HS256:
			bytes = new byte[32];
			break;
		case HS384:
			bytes = new byte[48];
			break;
		default:
			bytes = new byte[64];
		}
		random.nextBytes(bytes);
		return new SecretKeySpec(bytes, alg.getJcaName());
	}

	private String createJWT(String id, String issuer, String subject, long ttlMillis) {
		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);
		JwtBuilder builder = Jwts.builder().setId(id)
				.setIssuedAt(now)
				.setSubject(subject)
				.setIssuer(issuer)
				.signWith(signatureAlgorithm, signingKey);

		if (ttlMillis >= 0) {
			long expMillis = nowMillis + ttlMillis;
			Date exp = new Date(expMillis);
			builder.setExpiration(exp);
		}

		return builder.compact();
	}

	public static boolean validateJWT(String jwt, long id) {
		System.out.println("jwt = " + jwt);

		Claims claims = Jwts.parser()         
				.setSigningKey(DatatypeConverter.parseBase64Binary(secretKey.toString()))
				.parseClaimsJws(jwt).getBody();
		String userId = String.valueOf(id);
		if ( claims.getId().equals(userId) && claims.getSubject().equals("Timetracker") && claims.getIssuer().equals("Fluance")) {
			return true;
		}
		return false;
	}
	
	public static long getUserId(String jwt){
		Claims claims = Jwts.parser()         
				.setSigningKey(DatatypeConverter.parseBase64Binary(secretKey.toString()))
				.parseClaimsJws(jwt).getBody();
		long userId = Long.valueOf(claims.getId());
		return userId;
	}

	public UserProfile findByUsername(String username) {
		return userprofileRepository.findByUsername(username);
	}
}