package ai.neurofleetx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
private String token;
private UserDto user;
@Data
@AllArgsConstructor
public static class UserDto {
    private String email;
}
}