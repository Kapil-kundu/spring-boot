package com.substring.auth.auth_app.config;
import com.substring.auth.auth_app.dtos.ApiError;
import com.substring.auth.auth_app.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.View;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, View error) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorizeHttpRequests ->
                    authorizeHttpRequests
                            .requestMatchers("/api/v1/auth/register").permitAll()
                            .requestMatchers("/api/v1/auth/login").permitAll()
                            .requestMatchers("/api/v1/auth/refresh").permitAll()
                            .requestMatchers("/api/v1/auth/logout").permitAll()
                            .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, e) -> {
                // error message
                 e.printStackTrace();
                 response.setStatus(401);
                 response.setContentType("application/json");
                 String message =  e.getMessage();

                 String error1 = (String) request.getAttribute("error");
                 if(error1 != null) {
                     message = error1;
                 }

               // Map<String, Object> errorMap = Map.of("message", message, "statusCode", Integer.toString(401));
                var apiError = ApiError.of(HttpStatus.UNAUTHORIZED.value(), "Unauthorized Access !!", message, request.getRequestURI());
                var objectMapper = new ObjectMapper();
                response.getWriter().write(objectMapper.writeValueAsString(apiError));
            }))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) {
        return configuration.getAuthenticationManager();
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
