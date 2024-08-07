package com.example.backend.model;
import jakarta.persistence.*;
import lombok.Data;

// import java.sql.Blob;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonManagedReference;
// import com.fasterxml.jackson.annotation.JsonManagedReference;

// import com.example.backend.model.ImageModel;


@Entity
@Data
public class DataModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dataId;

    private String loanAmount;
    private String annualIncome;
    private String loanType;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String email;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String postalCode;
    private String addressDuration;
    private String occupation;
    private String monthlyIncome;
    private String bankName;
    private String accountNumber;
    private String cibilScore;
    private String bankPhone;
    private Boolean authorizeConsent;
    private Boolean agreeStatement;


    @Value("${loanStatus:Yet to Review}")
    private String loanStatus;
    private LocalDateTime submittedAt;
    private LocalDateTime RepaymentDate;

    // UNCOMMENT TO CONNECT WITH IMAGE TABLE
    // @OneToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "image_id", referencedColumnName = "id")
    // private ImageModel image;


    // private int userId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    // @JsonIgnore
    // @JsonManagedReference

    // @JsonIgnore
    // @OneToOne
    // @JoinColumn(name = "user_id")
    private UserModel user;
    
}