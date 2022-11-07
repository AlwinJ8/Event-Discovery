package com.group24.discovery.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

// composite primary key (userID, eventID) for userevents table
@Embeddable
public class UserEventId implements Serializable{
    
    private static final long serialVersionUID = 1L;

    @Column(name = "userid")
    private long userId;

    @Column(name = "eventid")
    private long eventId;

    public UserEventId() {

    }

    public UserEventId(Long userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }
    
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || this.getClass() != o.getClass()) {
            return false;
        }

        UserEventId other = (UserEventId) o;
        return Objects.equals(this.getUserId(), other.getUserId()) && Objects.equals(this.getEventId(), other.getEventId());
    } 

    @Override
    public int hashCode() {
        return Objects.hash(userId, eventId);
    }

}
