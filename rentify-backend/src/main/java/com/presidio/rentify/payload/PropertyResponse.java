package com.presidio.rentify.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyResponse {

    private long id;
    private String type;
    private String place;
    private String area;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private String nearbyHospitals;
    private String nearbyColleges;
    private String imageUrl;
    private long userId;
    private long likes;
    private String createdDate;
    private String lastModifiedDate;
}
