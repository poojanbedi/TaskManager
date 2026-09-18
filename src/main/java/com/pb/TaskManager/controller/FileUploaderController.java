package com.pb.TaskManager.controller;

import java.io.File;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
public class FileUploaderController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Placeholder for file upload logic
        // 1. Check if file is empty
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            // 2. Define the path where you want to save the file
            String uploadDirectory = System.getenv("UPLOAD_ROOT_DIR") + System.getenv("UPLOAD_TARGET_DIR") + "/";

            System.out.println("Upload directory: " + uploadDirectory);

            File dir = new File(uploadDirectory);

            if (!dir.exists()) {
                dir.mkdirs(); // Create directories if they don't exist
            }

            // 3. Get the original file name and save it to disk
            String fileName = file.getOriginalFilename();
            File destinationFile = new File(uploadDirectory + fileName);

            // Transfer the file content to the local filesystem
            file.transferTo(destinationFile);

            return ResponseEntity.ok("File uploaded successfully: " + fileName);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while uploading the file.");
        }
    }
}
