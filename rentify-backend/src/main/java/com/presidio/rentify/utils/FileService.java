package com.presidio.rentify.utils;


import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    public String uploadFile(MultipartFile file);
    public void deleteFile(String fileName);

}
