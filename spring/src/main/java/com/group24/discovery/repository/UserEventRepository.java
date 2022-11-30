package com.group24.discovery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;
import com.group24.discovery.model.UserEvent;

public interface UserEventRepository extends JpaRepository<UserEvent, Long> {
    int countByUserAndEvent(User user, Event event);

    boolean existsByUserAndEvent(User user, Event event);

    List<UserEvent> findByEventAndStatus(Event event, String status);

    List<UserEvent> findByUser(User user);

    @Query(value = "SELECT sub.userid, sub.eventid, sub.rsvpstatus FROM (SELECT userevents.userid, userevents.eventid, userevents.rsvpstatus, COUNT(*) OVER (PARTITION BY eventdate) AS c FROM (userevents INNER JOIN events ON userevents.eventid = events.eventid AND userevents.userid = :userID)) AS sub WHERE c > 1", nativeQuery = true)
    List<UserEvent> getConflictsByUser(@Param(value="userID") Long userID);

    UserEvent findByUserAndEvent(User user, Event event);
}
