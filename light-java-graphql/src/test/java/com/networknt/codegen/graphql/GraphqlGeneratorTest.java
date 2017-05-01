package com.networknt.codegen.graphql;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

/**
 * Created by steve on 01/05/17.
 */
public class GraphqlGeneratorTest {

    public static String targetPath = "/tmp/graphql";
    public static String configName = "/config.json";
    public static String schemaName = "/schema.graphqls";

    ObjectMapper mapper = new ObjectMapper();

    @BeforeClass
    public static void setUp() throws IOException {
        // create the output directory
        Files.createDirectories(Paths.get(targetPath));
    }

    //@AfterClass
    public static void tearDown() throws IOException {
        Files.deleteIfExists(Paths.get(targetPath));
    }

    @Test
    public void testGenerator() throws IOException {
        Map<String, Object> config = mapper.readValue(GraphqlGenerator.class.getResourceAsStream(configName), new TypeReference<Map<String,Object>>(){});
        InputStream is = GraphqlGenerator.class.getResourceAsStream(schemaName);
        String schema = convertStreamToString(is);

        GraphqlGenerator generator = new GraphqlGenerator();
        generator.generate(targetPath, schema, config);
    }

    static String convertStreamToString(java.io.InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
