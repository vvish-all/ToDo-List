package com.myproject.toDoList.service;

import com.myproject.toDoList.model.ToDoItem;
import com.myproject.toDoList.repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ToDoItemService {
    private final ToDoItemRepository repository;

    @Autowired
    public ToDoItemService(ToDoItemRepository repository) {
        this.repository = repository;
    }

    public List<ToDoItem> findAll() {
        return repository.findAll();
    }

    public ToDoItem findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public ToDoItem save(ToDoItem item) {
        return repository.save(item);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
