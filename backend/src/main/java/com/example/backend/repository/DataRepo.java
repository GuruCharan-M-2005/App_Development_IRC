package com.example.backend.repository;

import com.example.backend.model.DataModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

public interface DataRepo extends JpaRepository<DataModel,Integer> {

    @Query("SELECT u from DataModel u where u.user.userId in (SELECT i.userId FROM UserModel i WHERE i.islogin = 1)")
    public List<DataModel> getByUserId();

}
