package com.group24.discovery.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group24.discovery.exceptions.ResourceNotFoundException;
import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;
import com.group24.discovery.repository.EventRepository;
import com.group24.discovery.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateUser(@RequestParam long userID) {
        boolean exists = userRepository.existsByid(userID);
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", String.valueOf(userID));
        return new ResponseEntity<>(Collections.singletonMap("exists", exists), headers, HttpStatus.OK);
    }

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    @RequestMapping("/test") 
    public String test() {
        userRepository.save(new User(903111111, "Alwin Jin", "Student"));

        return "Done!";
    }
    
    
}
