package ai.neurofleetx.service;

import ai.neurofleetx.model.User;
import ai.neurofleetx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public void register(User u) {
        // Using raw passwords for development only (SecurityConfig provides a no-op encoder)
        userRepository.save(u);
    }

    public boolean checkPassword(User u, String rawPassword) {
        System.out.println("=== CHECK PASSWORD raw:'" + rawPassword + "' stored:'" + u.getPassword() + "'");
        boolean ok = rawPassword.equals(u.getPassword());
        System.out.println("=== PASSWORD MATCH: " + ok);
        return ok;
    }

    public String issueToken(User u) {
        return jwtService.generateToken(u.getEmail());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("=== LOOKUP USER email: " + email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        System.out.println("=== FOUND USER email: " + user.getEmail());
        return user;
    }
}
