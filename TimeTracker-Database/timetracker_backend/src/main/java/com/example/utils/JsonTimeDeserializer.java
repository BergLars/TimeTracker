package com.example.utils;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

@SuppressWarnings("rawtypes")
public class JsonTimeDeserializer extends JsonDeserializer {
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	
	@Override
	public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
	String date = p.getText();
        try {
        return dateFormat.parse(date+":00");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
	}
}