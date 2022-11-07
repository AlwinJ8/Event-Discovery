package com.group24.discovery.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users")
public class User {

    @Id
    @Column(name = "userid")
    private long id;

    @Column(name = "fullname")
    private String name;

    @Column(name = "usertype")
    private String type;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "host", fetch = FetchType.LAZY)
    private List<Event> hostedEvents;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, targetEntity = UserEvent.class)
    private Set<UserEvent> eventsAttending;

    public User() {
        
    }

    public User(long id, String name, String type) {
        this.id = id;
        this.name = name; 
        this.type = type; 
        this.hostedEvents = new ArrayList<Event>(); 
        this.eventsAttending = new HashSet<>();
    }

    public User(String name, String type) {
        this.name = name;
        this.type = type;
        this.hostedEvents = new ArrayList<Event>();
        this.eventsAttending = new HashSet<>();
    }

    public void setID(long id) {
        this.id = id;
    }
    
    public long getID() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

    public List<Event> getHostedEvents() {
        return this.hostedEvents;
    }

    public void setHostedEvents(List<Event> events) {
        this.hostedEvents = events;
    }

    public Set<UserEvent> getEventsAttending() {
        return this.eventsAttending;
    }

    public void setEventsAttending(Set<UserEvent> events) {
        this.eventsAttending = events;
    }

    public void hostEvent(Event event) {
        this.hostedEvents.add(event);
    }

    public void deleteHostedEvent(Event event) {
        if (event != null) {
            this.hostedEvents.remove(event);
        }
    }

    public void attendEvent(Event event) {
        UserEvent userEvent = new UserEvent(this, event);
        this.eventsAttending.add(userEvent);
        event.getUsersAttending().add(userEvent);
    }

    // public void unattendEvent(UserEvent event) {
    //     if (event != null) {
    //         this.eventsAttending.remove(event);
    //         event.getUsersAttending().remove(event);
    //     }
    // }
}
