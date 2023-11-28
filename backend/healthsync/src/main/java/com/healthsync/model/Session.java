package com.healthsync.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sessions")
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Session {

    private String patient;
    private String doctor;
    private String visitTime;
    private String disease;
    private List<String> simpletiles;
    private List<ComplexTile> complextiles;

}
