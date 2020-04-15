package com.project.omega.bean.dao.entity;

import lombok.Builder;

import javax.persistence.*;

@Entity
@Builder
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String companyName;

    private String email;

    private String address;

    private String postcode;

    private String town;

    private String county;

    private String country;

    private String description;

    private String contactNumber;

    private String notes;

    public Company() {

    }

    public Company(Long id, String firstName, String lastName, String companyName, String email, String address, String postcode, String town, String county, String country, String description, String contactNumber, String notes) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.town = town;
        this.county = county;
        this.country = country;
        this.description = description;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getPostcode() {
        return postcode;
    }

    public String getTown() {
        return town;
    }

    public String getCounty() {
        return county;
    }

    public String getCountry() {
        return country;
    }

    public String getDescription() {
        return description;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getNotes() {
        return notes;
    }

    public static class CompanyBuilder {

        private Long id;
        private String firstName;
        private String lastName;
        private String companyName;
        private String email;
        private String address;
        private String postcode;
        private String town;
        private String county;
        private String country;
        private String description;
        private String contactNumber;
        private String notes;

        public CompanyBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public CompanyBuilder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public CompanyBuilder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public CompanyBuilder setCompanyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public CompanyBuilder setAddress(String address) {
            this.address = address;
            return this;
        }

        public CompanyBuilder setPostcode(String postcode) {
            this.postcode = postcode;
            return this;
        }

        public CompanyBuilder setTown(String town) {
            this.town = town;
            return this;
        }

        public CompanyBuilder setCounty(String county) {
            this.county = county;
            return this;
        }

        public CompanyBuilder setCountry(String country) {
            this.country = country;
            return this;
        }

        public CompanyBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public CompanyBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public CompanyBuilder setContactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public CompanyBuilder setNotes(String notes) {
            this.notes = notes;
            return this;
        }

        public Company build() {
            return new Company(id, firstName, lastName, companyName, address, postcode, town, county, country, email, description, contactNumber, notes);
        }
    }


}
