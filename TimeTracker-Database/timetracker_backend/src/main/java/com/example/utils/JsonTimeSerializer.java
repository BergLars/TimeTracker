package com.example.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JsonTimeSerializer extends JsonSerializer<Date> {
private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	
	@Override
	public void serialize(Date date, JsonGenerator gen, SerializerProvider serializers)throws  IOException, JsonProcessingException {
		String formattedDate = dateFormat.format(date);
	gen.writeString(formattedDate.substring(0,5));
	}
}