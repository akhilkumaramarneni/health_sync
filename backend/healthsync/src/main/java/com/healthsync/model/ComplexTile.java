package com.healthsync.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ComplexTile {
    private String type;
    private List<Task> todo;
    private List<Task> notTodos;
}
