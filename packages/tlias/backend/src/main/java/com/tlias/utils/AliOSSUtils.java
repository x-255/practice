package com.tlias.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Component
public class AliOSSUtils {
    @Autowired
    AliOSSProperties aliOSSProperties;

    public String upload(MultipartFile file) throws IOException {
        String endpoint = aliOSSProperties.getEndpoint();
        String accessKeyId = aliOSSProperties.getAccessKeyId();
        String accessKeySecret = aliOSSProperties.getAccessKeySecret();
        String bucketName = aliOSSProperties.getBucketName();

        InputStream inputStream = file.getInputStream();
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileName = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        PutObjectResult putObjectResult = ossClient.putObject(bucketName, fileName, inputStream);

        String[] endpointArr = endpoint.split("//");
        String url = endpointArr[0] + "//" + bucketName + "." + endpointArr[1] + "/" + fileName;

        ossClient.shutdown();

        return url;
    }
}
