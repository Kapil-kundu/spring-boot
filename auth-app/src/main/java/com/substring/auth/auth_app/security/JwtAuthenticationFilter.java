package com.substring.auth.auth_app.security;

import com.substring.auth.auth_app.helpers.UserHelper;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import com.substring.auth.auth_app.repositories.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);


    @Override
    protected void doFilterInternal(HttpServletRequest request , HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        logger.info("Authorization header : {}", header);
        if(header != null && header.startsWith("Bearer ") ) {
            //token extract and validate then authentication create and then security context ke ander set karegne

            // our token is like token = Bearer 32kjfal;fa545dsfz62541k5kffadf12345345......
            // so we take the actual token and removing the Bearer by taking substring from 7(beginning index)
            String token = header.substring(7);

            try{

                // check for access token
                if(!jwtService.isAccessToken(token)) {

                    try {
                        filterChain.doFilter(request, response);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    return;
                }
               Jws<Claims> parse =  jwtService.parse(token);

               Claims payload = parse.getPayload();

               String userId = payload.getSubject();
               UUID userUuid = UserHelper.parseUUID(userId);
               userRepository.findById(userUuid)
                       .ifPresent(user -> {

                           if(user.isEnabled()) {
                               // founded the user from the database
                               List<GrantedAuthority> authorities = user.getRoles() == null ? List.of(): user.getRoles().stream()
                                       .map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                               UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                       user.getEmail(),
                                       null,
                                       authorities
                               );
                               authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                               // final line : to set the authentication to security context
                               if(SecurityContextHolder.getContext().getAuthentication() == null) {
                                   SecurityContextHolder.getContext().setAuthentication(authentication);
                               }
                           }

                       });


            } catch (ExpiredJwtException e) {
                request.setAttribute("error", "Token Expired");
               // e.printStackTrace();
            } catch (Exception e) {
                request.setAttribute("error", "Invalid Token");
                //e.printStackTrace();

            }

        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth/");
    }
}
