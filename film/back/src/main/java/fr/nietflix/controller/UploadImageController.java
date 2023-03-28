package fr.nietflix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
@CrossOrigin
public class UploadImageController {

    private static final String SERVER_URL = "http://localhost:8081";
    private static final String BASE_URL = "/uploads/";

    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {

        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            String projectPath = new File("").getAbsolutePath();
            String uniqueName = getUniqueFileName(fileName);
            File destFile = new File(projectPath + BASE_URL + uniqueName);
            file.transferTo(destFile);
            return ResponseEntity.ok().body(SERVER_URL + BASE_URL + uniqueName);
        } else {
            return ResponseEntity.badRequest().body("File not provided");
        }
    }

    private String getUniqueFileName(String name) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "-" + name;
    }
}
