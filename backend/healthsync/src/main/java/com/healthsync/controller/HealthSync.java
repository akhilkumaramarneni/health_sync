package com.healthsync.controller;

import com.healthsync.model.Session;
import com.healthsync.repository.impl.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HealthSync {

    private SessionService sessionService;

    public HealthSync(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/get-all-sessions")
    public List<Session> getAllSessions(){
        return sessionService.getAllSession();
    }

    @PostMapping("/upload-session")
    public String uploadSession(@RequestBody Session session){
        return sessionService.uploadSession(session);
    }
}
