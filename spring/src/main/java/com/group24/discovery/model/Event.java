package com.group24.discovery.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eventid")
    private long id;

    @Column(name = "eventname")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "eventdate")
    private String date;

    @Column(name = "descript")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hostid")
    @JsonIgnore
    private User host;

    @ManyToMany(mappedBy = "eventsAttending", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private Set<User> usersAttending;

    public Event() {

    }

    public Event(String name, String location, String date, User host, String description) {
        super();
        this.name = name;
        this.location = location;
        this.date = date;
        this.host = host;
        this.description = description;
        this.usersAttending = new HashSet<>();
    }

    public Event(String name, String location, String date, String description) {
        super();
        this.name = name;
        this.location = location;
        this.date = date;
        this.description = description;
        this.usersAttending = new HashSet<>();
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public User getHost() {
        return host;
    }
    public void setHost(User host) {
        this.host = host;
    }
    public String getDescription() {
        return this.description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Set<User> getUsersAttending() {
        return usersAttending;
    }
    public void setUsersAttending(Set<User> usersAttending) {
        this.usersAttending = usersAttending;
    }
    

    public void addAttendingUser(User user) {
        this.usersAttending.add(user);
        user.getEventsAttending().add(this);
    }

    public void removeAttendingUser(User user) {
        if (user != null) {
            this.usersAttending.remove(user);
            user.getEventsAttending().remove(this);
        }
    }

    // Tester toString for events
    public String toString() {
        return this.name + " " + this.id;
    }
}
