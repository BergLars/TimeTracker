package com.example.model;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatter {
	public static final void convertToDate(Date date){
		SimpleDateFormat ft = new SimpleDateFormat ("yyyy.MM.dd");
		ft.format(date);
	}

	public static final void convertToTime(Time time){
		SimpleDateFormat ft = new SimpleDateFormat ("HH:mm:ss");
		ft.format(time);
	}
}