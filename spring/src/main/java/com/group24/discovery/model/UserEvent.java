package com.group24.discovery.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "userevents")
public class UserEvent {
    
    @EmbeddedId
    private UserEventId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eventId")
    @JoinColumn(name = "eventid")
    private Event event;

    @Column(name = "rsvpstatus")
    private String status;

    public UserEvent() {

    }

    public UserEvent(User user, Event event) {
        this.user = user;
        this.event = event;
        this.id = new UserEventId(user.getID(), event.getId());
    }

    public UserEvent(User user, Event event, String status) {
        this.user = user;
        this.event = event;
        this.status = status;
        this.id = new UserEventId(user.getID(), event.getId());
    }
    
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String toString() {
        return user + " " + event + " " + status;
    }
}
