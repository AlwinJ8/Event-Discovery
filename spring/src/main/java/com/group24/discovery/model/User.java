package com.group24.discovery.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {

    @Id
    @Column(name = "userid")
    private long id;

    @Column(name = "fullname")
    private String name;

    public User() {
        
    }

    public User(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public void setID(long id) {
        this.id = id;
    }
    
    public long getID(long id) {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
