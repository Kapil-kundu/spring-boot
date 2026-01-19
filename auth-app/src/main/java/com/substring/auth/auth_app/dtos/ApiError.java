package com.substring.auth.auth_app.dtos;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        Instant timestamp
) {
    public static ApiError of(int status, String error, String message, String path) {
        return new ApiError(status, error, message, path, Instant.now());
    }
}
