package com.group24.discovery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;
import com.group24.discovery.model.UserEvent;

public interface UserEventRepository extends JpaRepository<UserEvent, Long> {
    int countByUserAndEvent(User user, Event event);

    boolean existsByUserAndEvent(User user, Event event);

    List<UserEvent> findByEventAndStatus(Event event, String status);

    UserEvent findByUserAndEvent(User user, Event event);
}
