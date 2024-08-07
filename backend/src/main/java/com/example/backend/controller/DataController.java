package com.example.backend.controller;

// import java.io.IOException;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.DataModel;
// import com.example.backend.model.UserModel;
import com.example.backend.service.DataService;

// import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins="http://localhost:3000")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/getall")
    public  ResponseEntity<List<DataModel>> GetAllData() {
        return ResponseEntity.ok(dataService.getData());
    }

    @GetMapping("/getallbyuser")
    public  ResponseEntity<List<DataModel>> GetAllDataByUser() {
        return ResponseEntity.ok(dataService.getDataByUserId());
    }

    @GetMapping("/getbyid/{id}")
    public DataModel getById(@PathVariable int id) {
        return dataService.getDataById(id);
    }

    @PostMapping("/post")
    public ResponseEntity<DataModel> postData(@RequestBody DataModel data) {
        System.out.println("Received data: " + data);
    // if (data.getUser() != null) {
        // System.out.println("User ID: " + data.getUser().getUserId());
    // } else {
        // System.out.println("User is null");
    // }
        DataModel savedData = dataService.postData(data);
        return ResponseEntity.ok(savedData);
    } 


    @PostMapping("/postall")
    public List<DataModel> postById(@RequestBody List<DataModel> data) {
        return dataService.postAllData(data);
    }

    @DeleteMapping("/{dataId}")
    public ResponseEntity<String> deleteData(@PathVariable int dataId) {
        dataService.deleteData(dataId);
        return ResponseEntity.ok("Data deleted successfully.");
    }

     @PutMapping("/editDataLoanStatus/{dataId}/{newStatus}")
    public ResponseEntity<DataModel> editUser(@PathVariable int dataId, @PathVariable String newStatus) {
        DataModel editedUser = dataService.editData(dataId, newStatus);
        return ResponseEntity.ok(editedUser);
    }

    //  @PutMapping("/editDataRepaymentStatus/{dataId}/{schedule}")
    // public ResponseEntity<DataModel> editUserRepayment(@PathVariable int dataId, @PathVariable String schedule) {
    //     DataModel editedUser = dataService.editDataPayment(dataId, schedule);
    //     return ResponseEntity.ok(editedUser);
    // }

}
