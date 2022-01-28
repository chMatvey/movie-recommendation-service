package com.github.chMatvey.backend.repository;

import com.github.chMatvey.backend.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface UserRepository extends Neo4jRepository<User, String> {}