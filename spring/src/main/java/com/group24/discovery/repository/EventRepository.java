package com.group24.discovery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
    List<Event> findByHost(User host);
}
