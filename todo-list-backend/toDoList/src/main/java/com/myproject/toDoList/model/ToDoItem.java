package com.myproject.toDoList.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "todoitem")
public class ToDoItem implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Column(name = "id", unique = true)
    private Long id;
    @Column(name = "description")
    private String description;
    @Column(name = "duedate")
    private LocalDate duedate;
    @Column(name = "status")
    private String status; // e.g., "pending", "completed"
    
 // Getters and Setters
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the dueDate
	 */
	public LocalDate getDuedate() {
		return duedate;
	}
	/**
	 * @param duedate the dueDate to set
	 */
	public void setDuedate(LocalDate duedate) {
		this.duedate = duedate;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "ToDoItem [id=" + id + ", description=" + description + ", dueDate=" + duedate + ", status=" + status
				+ "]";
	}

    
    
    
    
}
