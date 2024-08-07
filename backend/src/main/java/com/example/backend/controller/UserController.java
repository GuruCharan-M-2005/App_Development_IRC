package com.example.backend.controller;

import com.example.backend.model.UserModel;
import com.example.backend.service.UserService;

import java.util.List;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getall")
    public ResponseEntity<List<UserModel>> getAllData(){
        return ResponseEntity.ok(userService.getalldata());
    }

    @GetMapping("/getalluseronly")
    public ResponseEntity<List<UserModel>> getAllDataUser(){
        return ResponseEntity.ok(userService.getallUserdataOnly());
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
        UserModel addedUser = userService.addUser(user);
        return ResponseEntity.ok(addedUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserModel> getUser(@PathVariable int userId) {
        UserModel user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/editUser/{userId}")
    public ResponseEntity<UserModel> editUser(@PathVariable int userId, @RequestBody UserModel user) {
        UserModel editedUser = userService.editUser(userId, user);
        return ResponseEntity.ok(editedUser);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @GetMapping("/isUserPresent/{email}/{password}")
    public ResponseEntity<UserModel> isUserPresent(@PathVariable String email,@PathVariable String password) {
        UserModel isPresent = userService.isUserPresent(email,password);
        // isPresent.setDataModels(null);
        return ResponseEntity.ok(isPresent);
    }

    @PutMapping("/updateLoginStatus/{userId}")
    public ResponseEntity<UserModel> updateLoginStatus(@PathVariable int userId, @RequestBody UserModel user) {
        UserModel updatedUser = userService.updateLoginStatus(userId, user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/loggedin")
    public UserModel getLoggedInUser() {
        return userService.findByIslogin();
    }

    @GetMapping("/isUserPresentByEmail")
    public boolean isUserPresentByEmail(@RequestParam String email) {
        return userService.isUserPresentByEmail(email);
    }

  
}
