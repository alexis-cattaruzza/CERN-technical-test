package com.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@EntityScan
public class TodoApplication {

    public static void main(String[] args) {

        System.setProperty("user.timezone", "UTC");
        SpringApplication.run(TodoApplication.class, args);
    }
}
