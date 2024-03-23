package com.tlias.utils;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Component
public class AliOSSUtils {
    private String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
    private String accessKeyId = "LTAI5tSjz2GnCKYmbGzUjVae";
    private String accessKeySecret = "gg55RDjemqwNMSpcegECHUdPz81Yy9";
    private  String bucketName = "ff-web-tlias";

    public String upload(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileName = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId,accessKeySecret);
        PutObjectResult putObjectResult = ossClient.putObject(bucketName, fileName, inputStream);

        String[] endpointArr = endpoint.split("//");
        String url = endpointArr[0] + "//" + bucketName + "." + endpointArr[1] + "/" + fileName;

        ossClient.shutdown();

        return url;
    }
}
