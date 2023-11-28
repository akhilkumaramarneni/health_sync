package com.healthsync.repository.impl;

import com.healthsync.model.Session;
import com.healthsync.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<Session> getAllSession(){
        return sessionRepository.findAll();
    }

    public String uploadSession(Session session) {
        Session store = sessionRepository.save(session);
        return "success";
    }
}
