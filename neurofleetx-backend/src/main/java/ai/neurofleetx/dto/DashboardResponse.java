package ai.neurofleetx.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class DashboardResponse {
private int vehicles;
private int activeTrips;
private int alerts;
private String lastUpdated;
}                                            