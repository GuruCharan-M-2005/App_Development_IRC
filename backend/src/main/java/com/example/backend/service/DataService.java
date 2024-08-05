package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.DataModel;
import com.example.backend.model.ImageModel;
import com.example.backend.repository.DataRepo;
import com.example.backend.repository.ImageRepo;

@Service
public class DataService {

    @Autowired
    private DataRepo dataRepo;

    @Autowired
    private ImageRepo imageRepo;

    public List<DataModel> getData(){
        return dataRepo.findAll();
    }
    public DataModel getDataById(int id){
        return dataRepo.findById(id).orElseThrow(()->new Error("Not Found"));
    }
    public List<DataModel> postAllData(List<DataModel> data){
        return dataRepo.saveAll(data);
    }
    public DataModel postData(DataModel data){
        return dataRepo.save(data);
    }

    public DataModel saveDataWithImages(DataModel dataModel) {
        ImageModel imageModel = dataModel.getImage();
        if (imageModel != null) {
            ImageModel savedImage = imageRepo.save(imageModel);
            dataModel.setImage(savedImage);
        }
        return dataRepo.save(dataModel);

    }
}
