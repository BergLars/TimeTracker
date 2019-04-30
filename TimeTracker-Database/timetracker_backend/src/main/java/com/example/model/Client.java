package com.example.model;

import org.springframework.data.domain.Persistable;
 
@SuppressWarnings("serial")
public class Client implements Persistable<Long>{

    private long cid;
     
    private String clientName;

	public Client() { }
 
    public Client(long cid, String clientName) {
       this.cid = cid;
       this.clientName = clientName;
    }

    @Override
	public Long getId() {
		return cid;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	@Override
	public boolean isNew() {
		// TODO Handle this in the future in the controller
		return true;
	}
}