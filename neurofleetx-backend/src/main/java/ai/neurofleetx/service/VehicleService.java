// src/main/java/ai/neurofleetx/service/VehicleService.java
package ai.neurofleetx.service;

import ai.neurofleetx.model.Vehicle;
import ai.neurofleetx.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository repo;

    public VehicleService(VehicleRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<Vehicle> findAll() {
        return repo.findAll();
    }

    @Transactional
    public Vehicle create(Vehicle body) {
        if (body.getLicensePlate() == null || body.getLicensePlate().isBlank()) {
            throw new IllegalArgumentException("licensePlate required");
        }
        if (repo.existsByLicensePlate(body.getLicensePlate())) {
            throw new IllegalStateException("licensePlate exists");
        }
        if (body.getStatus() == null || body.getStatus().isBlank()) {
            body.setStatus("active");
        }
        return repo.save(body);
    }
}
