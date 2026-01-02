package com.substring.auth.auth_app.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//    @Bean
//     public UserDetailsService users() {
//        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
//        UserDetails user1 = userBuilder.username("Ankit").password("abc").roles("ADMIN").build();
//        UserDetails user2 = userBuilder.username("Ramu").password("abcd").roles("USER").build();
//        UserDetails user3 = userBuilder.username("Raja").password("").roles("ADMIN").build();
//        return new InMemoryUserDetailsManager(user1, user2, user3);
//
//    }
}
