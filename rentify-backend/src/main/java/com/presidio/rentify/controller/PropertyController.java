package com.presidio.rentify.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.presidio.rentify.entity.Property;
import com.presidio.rentify.payload.MailRequest;
import com.presidio.rentify.payload.PropertyRequest;
import com.presidio.rentify.payload.PropertyResponse;
import com.presidio.rentify.repository.PropertyRepository;
import com.presidio.rentify.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@CrossOrigin(origins = "https://master--rentifydev.netlify.app")
@RequestMapping("/api/property")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    private final ObjectMapper mapper;

    @PostMapping("/add/{userid}")
    public ResponseEntity<String> addPropertyWithDetails(@PathVariable long userid, @RequestParam("property") String property,
                                                           @RequestParam("image") MultipartFile image)
            throws Exception {
        PropertyRequest request = new PropertyRequest();
        try {
            request = mapper.readValue(property, PropertyRequest.class);
            log.info("Property request: {}", request);
        } catch (JsonProcessingException e) {
            log.error("Invalid property request: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        String response = propertyService.addPropertyWithDetails(userid, request, image);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{landlordId}")
    public ResponseEntity<List<PropertyResponse>> getPropertyListByLandlordId(@PathVariable Long landlordId)
            throws Exception {
        List<PropertyResponse> properties = propertyService
                .getPropertyListByLandlordId(landlordId);
        return ResponseEntity.ok(properties);
    }


    @GetMapping("/lists")
    public ResponseEntity<List<PropertyResponse>> getPropertyList() throws Exception {
        List<PropertyResponse> properties = propertyService.getPropertyList();
        return ResponseEntity.ok(properties);
    }


    @PutMapping("/update/{propertyId}")
    public ResponseEntity<PropertyResponse> updateProperty(@PathVariable Long propertyId,
                                                           @RequestBody PropertyRequest request)
            throws Exception {
        PropertyResponse property = propertyService.updateProperty(propertyId, request);
        return ResponseEntity.ok(property);
    }


    @DeleteMapping("/delete/{propertyId}")
    public ResponseEntity<String> deleteProperty(@PathVariable Long propertyId) throws Exception {
        String response = propertyService.deleteProperty(propertyId);
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<PropertyResponse>> searchProperty(
            @PathVariable String keyword
    )  throws Exception {
        List<PropertyResponse> properties = propertyService.searchProperty(keyword);
        return ResponseEntity.ok(properties);
    }


    @PostMapping("/sendmail")
    public ResponseEntity<String> sendMail(@RequestBody MailRequest request) throws Exception {
        String response = propertyService.sendLandlordDetailToMail(request.getTo(), request.getLandlordId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/like/{propertyId}")
    public ResponseEntity<PropertyResponse> likeProperty(@PathVariable long propertyId) throws Exception {
        PropertyResponse property = propertyService.likeProperty(propertyId);
        return ResponseEntity.ok(property);
    }



    @GetMapping("/liked/{userid}")
    public ResponseEntity<Set<PropertyResponse>> getLikedProperties(@PathVariable long userid) throws Exception {
        Set<PropertyResponse> likedProperties = propertyService.getLikedProperties(userid);
        return ResponseEntity.ok(likedProperties);
    }
}
