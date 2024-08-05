package com.example.backend.repository;


import com.example.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepo  extends JpaRepository<UserModel, Integer> {

   @Query("SELECT u FROM UserModel u WHERE u.email = :email")
    UserModel findByEmail(@Param("email") String email);

    @Query("SELECT u FROM UserModel u WHERE u.islogin = 1")
    UserModel findByIslogin();

    // @Query("SELECT u FROM UserModel u WHERE u.islogin = 1")
    // UserModel findByEmail(String email);
    
}
