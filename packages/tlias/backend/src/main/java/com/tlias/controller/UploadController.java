package com.tlias.controller;

import com.tlias.pojo.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class UploadController {
    @PostMapping("/upload")
    public Result upload(MultipartFile file) throws Exception {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            int i = originalFilename.lastIndexOf(".");
            String ext = originalFilename.substring(i);
            String newName = UUID.randomUUID().toString() + ext;
            File to = new File("/Users/xff/upload_files/" + newName);
            file.transferTo(to);
            return Result.success(null, "上传成功");
        }
       return Result.error("上传失败");
    }
}
