package com.example.model;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

import org.postgresql.util.PGInterval;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
public class FluancePGInterval extends PGInterval {

	/**
	 * Diese Klasse wurde im Betrieb Fluance AG erstellt
	 * und dient dazu, die Daten, welche den Typ Interval haben
	 * korrekt darzustellen, dass das Datenformat als HH:mm angezeigt wird.
	 * 
	 * Die Fluance Version beinhaltete noch die Tage, welche in Stunden umgewandelt wurden,
	 * doch da dies für das Projekt nicht relevant ist, wurde dies entfernt.
	 */
	private final static DecimalFormat secondsFormat;
	private int hours;
	private int minutes;

	static {
		secondsFormat = new DecimalFormat("0.00####");
		DecimalFormatSymbols dfs = secondsFormat.getDecimalFormatSymbols();
		dfs.setDecimalSeparator('.');
		secondsFormat.setDecimalFormatSymbols(dfs);
	}

	public FluancePGInterval(String value) throws SQLException {
		super(value);
	}

	/**
	 * Returns the stored interval information as a string
	 *
	 * @return String represented interval
	 */
	@Override
	public String getValue() {
		String value = "";
		hours =  super.getHours();
		minutes = super.getMinutes();
		if (hours < 10) {
			value += "0" + hours + ":";
		} else {
			value += hours + ":";
		}
		
		if (minutes == 0) {
			value += minutes + "0";
		} else if (minutes < 10) {
			value += "0" + minutes;
		} else {
			value += minutes;
		}
		
		//value += getMinutes() ;
		value += getSeconds() == 0 ? "" : secondsFormat.format(getSeconds()) + " secs";

		return value;
	}

	@JsonIgnore
	public int getYears() {
		return super.getYears();
	}
	
	@JsonIgnore
	public int getMonths() {
		return super.getMonths();
	}
	
	@JsonIgnore
	public int getDays() {
		return super.getDays();
	}
	
	@JsonIgnore
	public int getHours() {
		return super.getHours();
	}
	
	@JsonIgnore
	public int getMinutes() {
		return super.getMinutes();
	}
	
	@JsonIgnore
	public double getSeconds() {
		return super.getSeconds();
	}

}
