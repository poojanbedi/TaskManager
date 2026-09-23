package com.pb.TaskManager.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
public class FileUploaderController {

    @Value("${app.upload.dir:uploads}")
    private String uploadRootDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("files") MultipartFile[] files) {
        // Placeholder for file upload logic
        // 1. Check if files are empty
        boolean isDirectoryCreated = false;
        if (files == null || files.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select at least one file to upload.");
        }

        try {
            // 2. Define the path where you want to save the files
            String uploadDirectory = System.getProperty("user.dir") + "/" + uploadRootDir + "/";

            System.out.println("Upload directory: " + uploadDirectory);

            File dir = new File(uploadDirectory);

            if (!dir.exists()) {
                isDirectoryCreated = dir.mkdirs(); // Create directories if they don't exist
            }

            if(!isDirectoryCreated && !dir.exists()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Could not create upload directory.");
            }

            // 3. Iterate over each file and save it to disk
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                File destinationFile = new File(uploadDirectory + fileName);

                // Transfer the file content to the local filesystem
                file.transferTo(destinationFile);
            }

            return ResponseEntity.ok("Files uploaded successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while uploading the files.");
        }
    }

}
