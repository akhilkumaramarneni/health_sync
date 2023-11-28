package com.healthsync.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Task {
    private String type;
    private String description;
    private List<String> suggestions;

}
