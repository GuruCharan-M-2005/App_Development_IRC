package com.example.backend.service;

import com.example.backend.model.UserModel;
// import com.example.backend.model.LoginModel;
import com.example.backend.repository.UserRepo;

// import java.util.Collections;
// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public UserModel isUserPresent(String data,String pass) {
        UserModel user = userRepository.findByEmail(data);
        if(user != null && user.getPassword().equals(pass)){
            return user;
        }
        return null;
    }

    public UserModel addUser(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel getUser(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public UserModel editUser(int userId, UserModel user) {
        user.setUserId(userId);
        return userRepository.save(user);
    }

    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }

    public UserModel updateLoginStatus(int userId, UserModel user) {
        UserModel existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setIslogin(user.getIslogin());
        return userRepository.save(existingUser);
    }

    public UserModel findByIslogin(){
        return userRepository.findByIslogin();
    }

    public boolean isUserPresentByEmail(String email) {
        if(userRepository.findByEmail(email)!=null){
            return true;
        }
        else{

            return false;
        }
    }

    // public UserModel getUsers(String username, String email, String phonenumber) {
    //     if (username != null) {
    //         return userRepository.findByUsername(username);
    //     } else if (email != null) {
    //         return userRepository.findByEmail(email);
    //     } else if (phonenumber != null) {
    //         return userRepository.findByPhonenumber(phonenumber);
    //     }
    //     return null;
    // }
    
}
