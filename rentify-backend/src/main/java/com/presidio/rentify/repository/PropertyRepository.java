package com.presidio.rentify.repository;

import com.presidio.rentify.entity.Property;
import com.presidio.rentify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> getPropertyListByLandlordId(Long landlordId);

    @Query("SELECT p FROM Property p WHERE p.area LIKE %:keyword% or p.nearbyColleges LIKE %:keyword% or " +
            "p.nearbyHospitals LIKE %:keyword% or p.place LIKE %:keyword%")
    List<Property> searchPropertyByTextFields(@Param("keyword") String keyword);

    @Query("SELECT p FROM Property p WHERE p.numberOfBathrooms = :keyword or p.numberOfBedrooms = :keyword")
    List<Property> searchPropertyByNumericFields(@Param("keyword") Integer keyword);

    Long findTotalLikesById(long propertyId);
}
