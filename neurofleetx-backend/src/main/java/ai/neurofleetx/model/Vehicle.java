// src/main/java/ai/neurofleetx/model/Vehicle.java
package ai.neurofleetx.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(
  name = "vehicle",
  uniqueConstraints = {
    @UniqueConstraint(name = "uk_vehicle_license_plate", columnNames = "license_plate")
  }
)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class) // optional: makes JSON keys snake_case
public class Vehicle {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // Keep the Java field camelCase; JSON becomes license_plate due to @JsonNaming
  @Column(name = "license_plate", nullable = false, length = 20)
  private String licensePlate;

  @Column(name = "status", nullable = false, length = 32)
  private String status = "active";

  @Column(name = "location", length = 128)
  private String location;

  @Column(name = "mileage")
  private Integer mileage;

  @Column(name = "fuel_level")
  private Integer fuelLevel;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  // Getters and setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getLicensePlate() { return licensePlate; }
  public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }

  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }

  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }

  public Integer getMileage() { return mileage; }
  public void setMileage(Integer mileage) { this.mileage = mileage; }

  public Integer getFuelLevel() { return fuelLevel; }
  public void setFuelLevel(Integer fuelLevel) { this.fuelLevel = fuelLevel; }

  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
