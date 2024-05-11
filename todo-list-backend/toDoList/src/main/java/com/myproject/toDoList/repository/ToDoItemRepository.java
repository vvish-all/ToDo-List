package com.myproject.toDoList.repository;

import com.myproject.toDoList.model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
}
