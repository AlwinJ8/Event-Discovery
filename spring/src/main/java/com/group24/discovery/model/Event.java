package com.group24.discovery.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "inviteonly", columnDefinition = "BIT", length = 1)
    private boolean inviteOnly;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hostid")
    @JsonIgnore
    private User host;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = UserEvent.class)
    @JsonIgnore
    private Set<UserEvent> usersAttending;

    // Constructors
    public Event() {

    }

    public Event(String name, String location, String date, User host, String description, int capacity, boolean inviteonly) {
        super();
        this.name = name;
        this.location = location;
        this.date = date;
        this.host = host;
        this.description = description;
        this.capacity = capacity;
        this.inviteOnly = inviteonly;
        this.usersAttending = new HashSet<>();
    }

    public Event(String name, String location, String date, String description, int capacity, boolean inviteonly) {
        super();
        this.name = name;
        this.location = location;
        this.date = date;
        this.description = description;
        this.capacity = capacity;
        this.inviteOnly = inviteonly;
        this.usersAttending = new HashSet<>();
    }

    // Getters and setters
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
    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    public boolean isInviteOnly() {
        return inviteOnly;
    }
    public void setInviteOnly(boolean inviteOnly) {
        this.inviteOnly = inviteOnly;
    }
    public Set<UserEvent> getUsersAttending() {
        return usersAttending;
    }
    public void setUsersAttending(Set<UserEvent> usersAttending) {
        this.usersAttending = usersAttending;
    }
    

    // public void addAttendingUser(User user) {
    //     UserEvent userEvent = new UserEvent(user, this);
    //     this.usersAttending.add(userEvent);
    //     user.getEventsAttending().add(userEvent);
    // }

    // public void removeAttendingUser(UserEvent user) {
    //     if (user != null) {
    //         this.usersAttending.remove(user);
    //         user.getEventsAttending().remove(this);
    //     }
    // }

    // Tester toString for events
    public String toString() {
        return this.name + " " + this.id;
    }
}
