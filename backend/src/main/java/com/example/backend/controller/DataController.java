package com.example.backend.controller;

import java.io.IOException;
// import java.sql.SQLException;
// import java.util.Base64;
import java.util.List;

// import javax.sql.rowset.serial.SerialBlob;
// import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.DataModel;
import com.example.backend.service.DataService;

// import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins="http://localhost:3000")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/getall")
    public  List<DataModel> GetAllData() {
        return dataService.getData();
    }

    @GetMapping("/getallbyuser")
    public  List<DataModel> GetAllDataByUser() {
        return dataService.getDataByUserId();
    }

    @GetMapping("/getbyid/{id}")
    public DataModel getById(@RequestParam int id) {
        return dataService.getDataById(id);
    }

    @PostMapping("/post")
    public ResponseEntity<DataModel> postData(@RequestBody DataModel data) throws IOException {
        DataModel savedData = dataService.saveDataWithImages(data);
        return ResponseEntity.ok(savedData);
    } 


    @PostMapping("/postall")
    public List<DataModel> postById(@RequestBody List<DataModel> data) {
        return dataService.postAllData(data);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        dataService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

}
