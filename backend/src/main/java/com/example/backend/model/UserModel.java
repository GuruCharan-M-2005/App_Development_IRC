package com.example.backend.model;

import java.util.List;

// import java.util.List;

// import java.util.List;

import org.springframework.beans.factory.annotation.Value;

// import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

// import com.fasterxml.jackson.annotation.JsonBackReference;
// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String email;
    private String password;
    private String username;
    private String mobileNumber;
    @Value("${islogin:0}")
    private int islogin;

    private String dateOfJoining;
    private String timeOfJoining;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // @JsonBackReference
    @JsonIgnore
    private List<DataModel> dataModels;

    // @OneToOne(mappedBy = "user")
    // private DataModel dataModel;
}
