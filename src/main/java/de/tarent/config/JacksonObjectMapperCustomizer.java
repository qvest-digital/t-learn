package de.tarent.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.jackson.ObjectMapperCustomizer;

import javax.inject.Singleton;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS;

@Singleton
public class JacksonObjectMapperCustomizer implements ObjectMapperCustomizer {

    public void customize(ObjectMapper mapper) {
        mapper.disable(WRITE_DATES_AS_TIMESTAMPS);
    }
}
