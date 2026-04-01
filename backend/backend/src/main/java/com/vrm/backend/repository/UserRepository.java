package com.vrm.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vrm.backend.model.User;

@Repository
// the repository speaks to the database and performs CRUD operations on User entities,
//  it extends JpaRepository which provides built-in methods for these operations
public interface UserRepository extends JpaRepository<User, Long> {
    // we need to find users by email for authentication and by verification code for email verification
    // these methods are not included in the JPA repository by default, so we define them here and Spring Data JPA will implement them automatically based on the method name
    // However JPArepository includes its own methods such as findById, findAll, save, deleteById, etc. that we can use without defining them here
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String code);
}
