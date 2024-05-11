package com.myproject.toDoList.controller;


import com.myproject.toDoList.model.ToDoItem;
import com.myproject.toDoList.service.ToDoItemService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@OpenAPIDefinition(info = @Info(
        title = "ToDo List",
        description = "These are all the APIs for Todo List",
        version = "1.0.0"))
@RequestMapping("/todo")

public class TodoController {
    private final ToDoItemService service;

    @Autowired
    public TodoController(ToDoItemService service) {
        this.service = service;
    }
    @Tag(name = "Fetch all ToDos")
    @GetMapping
    public  List<ToDoItem> getAllItems() {
        return service.findAll();
    }
    @Tag(name = "fetch Todo with id")
    @GetMapping("/{id}")
    public ResponseEntity<ToDoItem> getItemById(@PathVariable Long id) {
        ToDoItem item = service.findById(id);
        return ResponseEntity.ok(item);
    }
    @Tag(name = "Add new ToDo")
    @PostMapping
    public ResponseEntity<ToDoItem> createItem(@RequestBody ToDoItem item) {
        try {
            if(service.findById(item.getId()) != null){
                return null;
            }
        }catch(Exception e){

        }
        service.save(item);
        return ResponseEntity.ok(item);
    }
    @Tag(name = "Update Existing ToDo")
    @PutMapping("/{id}")
    public ResponseEntity<ToDoItem> updateItem(@PathVariable Long id, @RequestBody ToDoItem updatedItem) {
        ToDoItem item = service.findById(id);
        if(updatedItem.getDescription() != null) item.setDescription(updatedItem.getDescription());
        if(updatedItem.getDuedate() != null) item.setDuedate(updatedItem.getDuedate());
        if(updatedItem.getStatus() != null) item.setStatus(updatedItem.getStatus());
        service.save(item);
        return ResponseEntity.ok(item);
    }
    @Tag(name = "Delete a Todo with id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
