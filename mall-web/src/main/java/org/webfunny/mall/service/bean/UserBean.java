package org.webfunny.mall.service.bean;

public class UserBean {

    private Long id;
    private String username;

    protected UserBean() {}
    
    public UserBean(Long id,String username) {
    	super();
    	this.id = id;
        this.username = username;
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%d, username='%s']",
                id, username);
    }

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}
}

