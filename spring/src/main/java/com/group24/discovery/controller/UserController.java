package com.group24.discovery.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group24.discovery.exceptions.ResourceNotFoundException;
import com.group24.discovery.model.Event;
import com.group24.discovery.model.User;
import com.group24.discovery.model.UserEvent;
import com.group24.discovery.model.UserEventId;
import com.group24.discovery.repository.EventRepository;
import com.group24.discovery.repository.UserEventRepository;
import com.group24.discovery.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserEventRepository userEventRepository;

    // Validate user
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateUser(@RequestParam long userID) {
        boolean exists = userRepository.existsByid(userID);
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", String.valueOf(userID));
        return new ResponseEntity<>(Collections.singletonMap("exists", exists), headers, HttpStatus.OK);
    }

    /*
     * Gets all events in database. Returns in list of JSON with following fields: id, name, location, date, description, host, capacity, currentAttendance, inviteOnly
     */
    @GetMapping("/events")
    public ResponseEntity<List<Object>> getAllEvents(@RequestHeader("CurrentID") String CurrentID) {
        List<Event> events = eventRepository.findAll();
        List<Object> result = new ArrayList<Object>();
        for (Event e : events) {
            HashMap<String, Object> temp = new HashMap<>();
            temp.put("id", e.getId());
            temp.put("name", e.getName());
            temp.put("hostid", e.getHost().getID());
            temp.put("location", e.getLocation());
            temp.put("date", e.getDate());
            temp.put("description", e.getDescription());
            temp.put("host", e.getHost().getName());
            temp.put("capacity", e.getCapacity());
            temp.put("currentAttendance", this.getCurrentAttendance(e));
            temp.put("inviteOnly", e.isInviteOnly());
            result.add(temp);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", CurrentID);
        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }
    
    // Create new user
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestHeader("CurrentID") String currID, @RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        user.setID(Long.parseLong(currID));
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, headers, HttpStatus.OK);
    }

    // Create new event
    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestHeader("CurrentID") String currID, @RequestBody Event event) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        User eventHost = userRepository.findById(Long.parseLong(currID)).get();
        event.setHost(eventHost);
        Event createdEvent = eventRepository.save(event);
        return new ResponseEntity<>(createdEvent, headers, HttpStatus.OK);
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

        // check permissions
        if (event.getHost().equals(user) || user.getType().equals("Admin")) {
            event.setName(eventDetails.getName());
            event.setLocation(eventDetails.getLocation());
            event.setDate(eventDetails.getDate());
            event.setDescription(eventDetails.getDescription());
            event.setInviteOnly(eventDetails.isInviteOnly());
            event.setCapacity(eventDetails.getCapacity());
    
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

    // Delete event
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEvent(@RequestHeader("CurrentID") String currID, @PathVariable Long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event does not exist with id: " + id));
        User user = userRepository.findById(Long.parseLong(currID)).get();

        // check permissions
        if (event.getHost().equals(user) || user.getType().equals("Admin")) {
            eventRepository.delete(event);
            return new ResponseEntity<>(Collections.singletonMap("deleted", true), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("deleted", false), headers, HttpStatus.OK);
        }
    }

    /*
     * RSVP to event. Give userid through headers, event id through path variable, and status through request body as JSON in following format:
     * 
     *  {
     *      "status": "Will Attend" (or whatever status)
     *  }
     * 
     * Response: JSON with boolean field "rsvpSuccess" that represents if user successfully rsvped to event (will only be false if event is invite only, and user was not invited, or if event is at capacity) and string field "reason". Also returns another object containing information about RSVP (userid, eventid, status) if successful.
     * Example: { "rsvpSuccess": "true" }, { "rsvpSuccess": "false", "reason": "Not Invited" }
     */
    @PostMapping("/rsvp/{id}")
    public ResponseEntity<Map<Object, Object>> attendEvent(@RequestHeader("CurrentID") String currID, @PathVariable Long id, @RequestBody String json) throws JsonMappingException, JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).get();
        User user = userRepository.findById(Long.parseLong(currID)).get();
        boolean canAttend = true;
        String reason = "";

        // Parse json
        ObjectMapper mapper = new ObjectMapper();
        String status = mapper.readTree(json).get("status").asText();

        // Check if user is invited if event is invite only
        if (event.isInviteOnly()) {
            if (userEventRepository.countByUserAndEvent(user, event) == 0) {
                canAttend = false;
                reason = "Not Invited";
            } else {
                UserEvent userEvent = new UserEvent(user, event, status);
                userEventRepository.save(userEvent);
            }
        } else if (this.getCurrentAttendance(event) >= event.getCapacity()) {
            canAttend = false; 
            reason = "No space";
        } else {
            UserEvent userEvent = new UserEvent(user, event, status);
            userEventRepository.save(userEvent);
        }

        Map<Object, Object> map = new HashMap<>();
        map.put("rsvpSuccess", canAttend);
        if (!canAttend) {
            map.put("reason", reason);
        }

        return new ResponseEntity<>(map, headers, HttpStatus.OK);

    }

    /*
     * Edit event RSVP status. Pass information in the same way as the attendingEvent method. Returns JSON with one field status, with the new updated status
     */
    @PutMapping("/rsvp/{id}")
    public ResponseEntity<Map<String, String>> changeStatus(@RequestHeader("CurrentID") String currID, @PathVariable Long id, @RequestBody String json) throws JsonMappingException, JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).get();
        User user = userRepository.findById(Long.parseLong(currID)).get();

        // Parse json
        ObjectMapper mapper = new ObjectMapper();
        String status = mapper.readTree(json).get("status").asText();

        UserEvent userEvent = userEventRepository.findByUserAndEvent(user, event);
        userEvent.setStatus(status);
        UserEvent savedUserEvent = userEventRepository.save(userEvent);

        return new ResponseEntity<>(Collections.singletonMap("status", savedUserEvent.getStatus()), headers, HttpStatus.OK);
    }

    /*
     * Remove RSVP of a user to an event. Pass userID and eventid through as path variables.
     * Returns JSON with one boolean field: "success": "true/false" (will fail if person removing RSVP is not the person who made it or the host)
     */
    @DeleteMapping("/rsvp/{eventid}/{userid}")
    public ResponseEntity<Map<String, Boolean>> deleteRSVP(@RequestHeader("CurrentID") String currID, @PathVariable Long eventid, @PathVariable Long userid) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(eventid).get();
        User currUser = userRepository.findById(Long.parseLong(currID)).get();
        User user = userRepository.findById(userid).get();
        boolean success = false;

        if (! (userEventRepository.existsByUserAndEvent(user, event))) {
            return new ResponseEntity<>(Collections.singletonMap("success", success), headers, HttpStatus.OK);
        }

        UserEvent userEvent = userEventRepository.findByUserAndEvent(user, event);

        // Check permissions
        if (event.getHost().equals(currUser) || userEvent.getUser().equals(currUser)) {
            userEventRepository.delete(userEvent);
            success = true;
        }
        return new ResponseEntity<>(Collections.singletonMap("success", success), headers, HttpStatus.OK);
    }

    /*
     * Get attendees of event with given status. Pass eventid as path variable, pass status query string (use "+" for spaces). Example request:
     *  GET http://localhost:8080/api/attendees/3?status=will+attend will return all users that RSVPed eventid 3 with "Will Attend" status.
     * 
     * Response: list of JSON objects with fields id, name, type. Example response:
     * 
     * {
     *  {
     *  "name": "John Smith",
     *   "id": 903111111,
     *   "type": "Student"
     *   },
     *   {
     *   "name": "Jane Smith",
     *   "id": 903222222,
     *   "type": "Admin"
     *   }
     * }
     */
    @GetMapping("/attendees/{id}")
    public ResponseEntity<List<Object>> getAttendees(@RequestHeader("CurrentID") String currID, @PathVariable Long id, @RequestParam String status) throws JsonMappingException, JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(id).get();
        List<Object> attendees = new ArrayList<>();

        List<UserEvent> list = userEventRepository.findByEventAndStatus(event, status);
        for (UserEvent u : list) {
            Map<String, Object> temp = new HashMap<>();
            User user = u.getUser();
            temp.put("id", user.getID());
            temp.put("name", user.getName());
            temp.put("type", user.getType());
            attendees.add(temp);
        }

        return new ResponseEntity<>(attendees, headers, HttpStatus.OK);

    }
    
/*
     * Invite user to an event. Pass eventid through path variable eventid and userid of who you want to invite through path variable userid.
     * 
     * Returns JSON {"success": true} if successful. If unsuccessful, returns JSON {"success": false, "reason": "reason here"}.
     */
    @PostMapping("/events/invite/{eventid}/{userid}")
    public ResponseEntity<Map<String, Object>> inviteUser(@RequestHeader("CurrentID") String currID, @PathVariable Long eventid, @PathVariable Long userid) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(eventid).get();

        // Check if invited u ser is registered
        if (! (userRepository.existsByid(userid))) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("success", false);
            temp.put("reason", "Invited user is not registered");
            return new ResponseEntity<>(temp, headers, HttpStatus.OK);
        }

        User user = userRepository.findById(Long.parseLong(currID)).get();
        User invitedUser = userRepository.findById(userid).get();

        // Check permissions
        if (event.getHost().equals(user) || user.getType().equals("Admin")) {
            UserEvent userEvent = new UserEvent(invitedUser, event, "Invited");
            userEventRepository.save(userEvent);
            return new ResponseEntity<>(Collections.singletonMap("success", true), headers, HttpStatus.OK);
        } else {
            Map<String, Object> temp = new HashMap<>();
            temp.put("success", false);
            temp.put("reason", "You do not have permissions to invite users");
            return new ResponseEntity<>(temp, headers, HttpStatus.OK);
        }
    }

    /*
     * Gets RSVP information of current user for given event. Pass event through query string eventid
     * 
     * Sample response: {"hasRSVP": "false", "rsvpStatus": "Not RSVPed"}
     * Sample response 2: {"hasRSVP": "true", "rsvpStatus": "Will Attend"}
     */
    @GetMapping("/rsvp/check")
    public ResponseEntity<Map<String, Object>> checkStatus(@RequestHeader("CurrentID") String currID, @RequestParam String eventid) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        Event event = eventRepository.findById(Long.parseLong(eventid)).get();
        User user = userRepository.findById(Long.parseLong(currID)).get();

        // Check if user RSVPed at all
        if (! (userEventRepository.existsByUserAndEvent(user, event))) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("hasRSVP", false);
            temp.put("rsvpStatus", "Not RSVPed");
            return new ResponseEntity<>(temp, headers, HttpStatus.OK);
        }

        UserEvent userEvent = userEventRepository.findByUserAndEvent(user, event);
        Map<String, Object> temp = new HashMap<>();
        temp.put("hasRSVP", true);
        temp.put("rsvpStatus", userEvent.getStatus());
        return new ResponseEntity<>(temp, headers, HttpStatus.OK);
    }

    /*
     * Gets all events that current user is RSVP'd to. Pass in userID as header "CurrentID". Returns information in same format as the GET "/events" endpoint.
     */
    @GetMapping("/events/attending")
    public ResponseEntity<List<Object>> getUserEventsAttending(@RequestHeader("CurrentID") String currID) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);
        User user = userRepository.findById(Long.parseLong(currID)).get();

        List<UserEvent> userEvents = userEventRepository.findByUser(user);
        List<Object> response = new ArrayList<>();

        for (UserEvent curr : userEvents) {
            Event e = eventRepository.findById(curr.getEvent().getId()).get();
            Map<String, Object> temp = new HashMap<>();
            temp.put("id", e.getId());
            temp.put("name", e.getName());
            temp.put("hostid", e.getHost().getID());
            temp.put("location", e.getLocation());
            temp.put("date", e.getDate());
            temp.put("description", e.getDescription());
            temp.put("host", e.getHost().getName());
            temp.put("capacity", e.getCapacity());
            temp.put("currentAttendance", this.getCurrentAttendance(e));
            temp.put("inviteOnly", e.isInviteOnly());
            response.add(temp);
        }

        return new ResponseEntity<>(response, headers, HttpStatus.OK);

    }

    /*
     * Get all conflicting events for a user. Pass user through CurrentID header. Returns infomation in same format as the GET "/events" endpoint.
     */
    @GetMapping("/events/conflicts")
    public ResponseEntity<List<Object>> getUserConflicts(@RequestHeader("CurrentID") String currID) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("CurrentID", currID);

        List<UserEvent> userEvents = userEventRepository.getConflictsByUser(Long.parseLong(currID));
        List<Object> response = new ArrayList<>();

        for (UserEvent conflict : userEvents) {
            Event e = eventRepository.findById(conflict.getEvent().getId()).get();
            Map<String, Object> temp = new HashMap<>();
            temp.put("id", e.getId());
            temp.put("name", e.getName());
            temp.put("hostid", e.getHost().getID());
            temp.put("location", e.getLocation());
            temp.put("date", e.getDate());
            temp.put("description", e.getDescription());
            temp.put("host", e.getHost().getName());
            temp.put("capacity", e.getCapacity());
            temp.put("currentAttendance", this.getCurrentAttendance(e));
            temp.put("inviteOnly", e.isInviteOnly());
            response.add(temp);
        }

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    
    // Returns current attendance of event (number of people with "Will Attend" status)
    public int getCurrentAttendance(Event event) {
        return userEventRepository.findByEventAndStatus(event, "Will Attend").size();
    }
    
    // Endpoint for testing
    @RequestMapping("/test") 
    public String test() {
        User user = new User(903111111, "Ethan Wang", "Student");
        // userRepository.save(user);

        // Event event = new Event("Test event", "Atlanta", "12/12/12 12:00", user, "This is a test event", 50, false);
        // eventRepository.save(event);

        User user2 = userRepository.findById(903111111L).get();
        Event event2  = eventRepository.findById(6L).get();
        // UserEvent test = new UserEvent(user2, event2, "Invited");
        // userEventRepository.save(test);

        // eventRepository.delete(event2);

        return String.valueOf(event2.getUsersAttending().size());
    }
}
