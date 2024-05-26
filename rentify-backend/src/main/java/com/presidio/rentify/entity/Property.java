package com.presidio.rentify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.util.concurrent.atomic.AtomicInteger;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Setter
@Getter
public class Property extends BaseEntity {

    private String type;
    private String place;
    private String area;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private String nearbyHospitals;
    private String nearbyColleges;
    private long likes;

//    @ElementCollection
    @Column(length = 1000)
    private String imageUrls;


    @ManyToOne()
    private User landlord;


    public void incrementLikes() {
        likes++;
    }
    public void decrementLikes() {
        likes--;
    }
}
