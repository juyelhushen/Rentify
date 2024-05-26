package com.presidio.rentify.service;

import com.presidio.rentify.entity.Property;
import com.presidio.rentify.entity.User;
import com.presidio.rentify.payload.PropertyRequest;
import com.presidio.rentify.payload.PropertyResponse;
import com.presidio.rentify.repository.PropertyRepository;
import com.presidio.rentify.repository.UserRepository;
import com.presidio.rentify.utils.EmailService;
import com.presidio.rentify.utils.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final FileService fileService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public String addPropertyWithDetails(Long userid, PropertyRequest request, MultipartFile image)
            throws Exception {
        String imageUrl = fileService.uploadFile(image);
        User user = userService.findById(userid);
        Property property = Property.builder()
                .type(request.getType())
                .area(request.getArea())
                .imageUrls(imageUrl)
                .nearbyColleges(request.getNearbyColleges())
                .nearbyHospitals(request.getNearbyHospitals())
                .numberOfBathrooms(request.getNumberOfBathrooms())
                .numberOfBedrooms(request.getNumberOfBedrooms())
                .place(request.getPlace())
                .landlord(user)
                .likes(0)
                .build();

        propertyRepository.save(property);
        return "Property Successfully added";
    }

    @Override
    public List<PropertyResponse> getPropertyListByLandlordId(Long landlordId)
            throws Exception {
        List<Property> propertyList = propertyRepository
                .getPropertyListByLandlordId(landlordId);

        if (propertyList == null) throw new Exception("There is no property");

        return propertyList.stream()
                .map(this::mapToPropertyResponse)
                .toList();

    }


    @Override
    public PropertyResponse updateProperty(Long propertyId, PropertyRequest request) throws Exception {
        Property property = findPropertyById(propertyId);
        if (!Objects.isNull(property)) {
            property.setPlace(request.getPlace());
            property.setArea(request.getArea());
            property.setNumberOfBedrooms(request.getNumberOfBedrooms());
            property.setNumberOfBathrooms(request.getNumberOfBathrooms());
            property.setNearbyHospitals(request.getNearbyHospitals());
            property.setNearbyColleges(request.getNearbyColleges());
            propertyRepository.save(property);
        }
        return mapToPropertyResponse(property);
    }

    @Override
    public List<PropertyResponse> getPropertyList() {
        List<Property> propertyList = propertyRepository.findAll();
        return propertyList.stream()
                .map(this::mapToPropertyResponse)
                .toList();
    }

    private PropertyResponse mapToPropertyResponse(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        response.setType(property.getType());
        response.setPlace(property.getPlace());
        response.setArea(property.getArea());
        response.setNumberOfBedrooms(property.getNumberOfBedrooms());
        response.setNumberOfBathrooms(property.getNumberOfBathrooms());
        response.setNearbyHospitals(property.getNearbyHospitals());
        response.setNearbyColleges(property.getNearbyColleges());
        response.setImageUrl(property.getImageUrls());
        response.setUserId(property.getLandlord().getId());
        response.setLikes(property.getLikes());
        if (property.getCreatedDate() != null) response.setCreatedDate(property.getCreatedDate().toString());
        if (property.getLastModifiedDate() != null) response.setLastModifiedDate(property.getLastModifiedDate().toString());
        return response;
    }


    @Override
    public String deleteProperty(Long propertyId) throws Exception {
        Property property = findPropertyById(propertyId);
        propertyRepository.delete(property);
        return "Property with id : " + propertyId + " deleted";
    }

    private Property findPropertyById(Long propertyId) throws Exception {
        return propertyRepository.findById(propertyId)
               .orElseThrow(() -> new Exception("Property with id : " + propertyId + " not found "));
    }

    @Override
    public List<PropertyResponse> searchProperty(String keyword) throws Exception {
        List<Property> propertyList = propertyRepository.searchPropertyByTextFields(keyword);
        try {
            Integer numericKeyword = Integer.parseInt(keyword);
            propertyList.addAll(propertyRepository.searchPropertyByNumericFields(numericKeyword));
        } catch (NumberFormatException e) {
            throw new Exception(e);
        }
        return propertyList.stream().map(this::mapToPropertyResponse).toList();
    }


    @Override
    public String sendLandlordDetailToMail(String to, long landlordId) throws Exception {
        User user = userService.findById(landlordId);
        emailService.sendEmail(to,user);
        return "Landlord details email sent successfully";
    }


    @Override
    public PropertyResponse likeProperty(long propertyId) throws Exception {
        Property property = findPropertyById(propertyId);
        if (userService.ifLikedProperty(propertyId)) {
            property.decrementLikes();
            userService.removeFromLiked(propertyId);
        } else {
            property.incrementLikes();
            userService.addToLiked(propertyId);
        }

        Property savedProperty = propertyRepository.save(property);
        return mapToPropertyResponse(savedProperty);
    }

    @Override
    public Long getTotalLikes(long propertyId) {
        return propertyRepository.findTotalLikesById(propertyId);
    }

    @Override
    public Set<PropertyResponse> getLikedProperties(long userid) throws Exception {
        User user  = userService.findById(userid);
        Set<Long> propertyId = user.getLikedProperty();
        return propertyById(propertyId);
    }

    private Set<PropertyResponse> propertyById(Set<Long> propertyId) {
        return  propertyRepository.findAllById(propertyId).stream()
                .map(this::mapToPropertyResponse).collect(Collectors.toSet());

    };
}
