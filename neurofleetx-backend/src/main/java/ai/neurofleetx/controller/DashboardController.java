package ai.neurofleetx.controller;

import ai.neurofleetx.repository.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

// Allow the React dev origin; you can rely on global CORS too
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DashboardController {

  private final VehicleRepository vehicleRepository;

  public DashboardController(VehicleRepository vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  @GetMapping("/dashboard")
  public ResponseEntity<DashboardMetrics> dashboard(Authentication auth) {
    if (auth == null || !auth.isAuthenticated()) {
      return ResponseEntity.status(401).build();
    }
    long vehicles = vehicleRepository.count();
    DashboardMetrics metrics = new DashboardMetrics(
        vehicles,     // vehicles
        0,            // activeTrips (stub until trip logic exists)
        0,            // alerts (stub until alert logic exists)
        Instant.now() // lastUpdated
    );
    return ResponseEntity.ok(metrics);
  }

  // record works on Java 17 and serializes to JSON automatically
  public record DashboardMetrics(long vehicles, long activeTrips, long alerts, Instant lastUpdated) {}
}
