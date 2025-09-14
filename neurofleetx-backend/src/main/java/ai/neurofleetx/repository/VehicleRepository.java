// src/main/java/ai/neurofleetx/repository/VehicleRepository.java
package ai.neurofleetx.repository;

import ai.neurofleetx.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    boolean existsByLicensePlate(String licensePlate);
}
