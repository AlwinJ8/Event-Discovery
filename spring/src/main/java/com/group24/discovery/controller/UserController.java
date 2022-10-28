package com.group24.discovery.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group24.discovery.exceptions.ResourceNotFoundException;
import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;
import com.group24.discovery.repository.EventRepository;
import com.group24.discovery.repository.UserRepository;


@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateUser(@RequestParam long userID) {
        boolean exists = userRepository.existsByid(userID);
        return new ResponseEntity<Boolean>(exists, HttpStatus.OK);
    }
    
    @RequestMapping("/test") 
    public String test() {
        userRepository.save(new User(903111111, "Alwin Jin", "Student"));

        return "Done!";
    }
    
    
}
