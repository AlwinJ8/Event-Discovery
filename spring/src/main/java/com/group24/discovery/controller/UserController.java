package com.group24.discovery.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<List<Event>> getAllEvents(@RequestHeader("CurrentID") String CurrentID) {
        List<Event> events = eventRepository.findAll();
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", CurrentID);
        return new ResponseEntity<>(events, headers, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestHeader("CurrentID") String currID, @RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        user.setID(Long.parseLong(currID));
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, headers, HttpStatus.ACCEPTED);
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestHeader("CurrentID") String currID, @RequestBody Event event) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        User eventHost = userRepository.findById(Long.parseLong(currID)).get();
        event.setHost(eventHost);
        Event createdEvent = eventRepository.save(event);
        return new ResponseEntity<>(createdEvent, headers, HttpStatus.ACCEPTED);
    }

    /*
     * Use when editing events (make sure to pass CurrentID header). Gives data in JSON with two values:
     * { {Newly edited event details}, {edited : true/false}}.
     * Use the edited : true/false value to determine if the user had permissions to edit the event (will be false if user does not have permissions)
     */
    @PutMapping("/events/{id}")
    public ResponseEntity<List<Object>> editEvent(@RequestHeader("CurrentID") String currID, @PathVariable Long id, @RequestBody Event eventDetails) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event does not exist with id: " + id));
        User user = userRepository.findById(Long.parseLong(currID)).get();

        if (event.getHost().equals(user) || user.getType().equals("Admin")) {
            event.setName(eventDetails.getName());
            event.setLocation(eventDetails.getLocation());
            event.setDate(eventDetails.getDate());
            event.setDescription(eventDetails.getDescription());
    
            Event updatedEvent = eventRepository.save(event);
            List<Object> list = new ArrayList<Object>();
            list.add(updatedEvent);
            list.add(Collections.singletonMap("edited", true));
            return new ResponseEntity<List<Object>>(list, headers, HttpStatus.OK);
        } else {
            List<Object> list = new ArrayList<>();
            list.add(Collections.singletonMap("edited", false));
            return new ResponseEntity<>(list, headers, HttpStatus.OK);
        }

    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEvent(@RequestHeader("CurrentID") String currID, @PathVariable Long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event does not exist with id: " + id));
        User user = userRepository.findById(Long.parseLong(currID)).get();

        if (event.getHost().equals(user) || user.getType().equals("Admin")) {
            eventRepository.delete(event);
            return new ResponseEntity<>(Collections.singletonMap("deleted", true), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("deleted", false), headers, HttpStatus.OK);
        }
    }
    
    // Endpoint for testing
    @RequestMapping("/test") 
    public String test() {
        User alwin = userRepository.findById(903111111L).get();
        Event event = eventRepository.findById(2L).get();
        eventRepository.delete(event);

        return alwin.getEventsAttending().toString();
    }
    
    
}
