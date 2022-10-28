package com.group24.discovery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group24.discovery.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByid(long id);
}
