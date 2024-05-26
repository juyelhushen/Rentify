package com.presidio.rentify.service;

import com.presidio.rentify.entity.Property;
import com.presidio.rentify.payload.PropertyRequest;
import com.presidio.rentify.payload.PropertyResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;


public interface PropertyService {

    String addPropertyWithDetails(Long userid, PropertyRequest request, MultipartFile image) throws Exception;

    List<PropertyResponse> getPropertyListByLandlordId(Long landlordId) throws Exception;

    PropertyResponse updateProperty(Long propertyId, PropertyRequest request) throws Exception;

    String deleteProperty(Long propertyId) throws Exception;

    List<PropertyResponse> getPropertyList();

    List<PropertyResponse> searchProperty(String keyword) throws Exception;

    String sendLandlordDetailToMail(String to, long landlordId) throws Exception;

    PropertyResponse likeProperty(long propertyId) throws Exception;

    Long getTotalLikes(long propertyId);

    Set<PropertyResponse> getLikedProperties(long userid) throws Exception;
}
