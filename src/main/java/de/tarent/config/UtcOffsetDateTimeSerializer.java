package de.tarent.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

import static java.time.ZoneOffset.UTC;
import static java.time.temporal.ChronoUnit.SECONDS;

public class UtcOffsetDateTimeSerializer extends StdSerializer<OffsetDateTime> {

    public UtcOffsetDateTimeSerializer() {
        this(null);
    }

    public UtcOffsetDateTimeSerializer(Class<OffsetDateTime> t) {
        super(t);
    }

    @Override
    public void serialize(OffsetDateTime value, JsonGenerator generator, SerializerProvider provider) throws IOException {
        final OffsetDateTime truncatedToSecondsUTC = value.withOffsetSameInstant(UTC).truncatedTo(SECONDS);
        generator.writeString(DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(truncatedToSecondsUTC));
    }
}
