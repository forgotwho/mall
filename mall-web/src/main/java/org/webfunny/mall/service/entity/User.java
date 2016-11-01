package org.webfunny.mall.service.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.tomcat.util.security.MD5Encoder;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String state;
    private Date createTime;
	private Date updateTime;

    protected User() {}
    
    public User(String username, String password) {
        this.username = username;
        this.password = MD5Encoder.encode(password.getBytes());
    }

    public User(String username, String password,String state) {
        this.username = username;
        this.password = MD5Encoder.encode(password.getBytes());
        this.state = state;
        this.createTime = new Date();
        this.updateTime = new Date();
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%d, username='%s', state='%s']",
                id, username, state);
    }

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}
	
	public String getState() {
		return state;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}
}

