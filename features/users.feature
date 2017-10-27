Feature: Users
  Scenario: Add New User
    Given The user does not exist
    When I add a new user
    Then A user should be created in the database
