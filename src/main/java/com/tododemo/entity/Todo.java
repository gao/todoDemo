package com.tododemo.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.tododemo.entity.BaseEntity;

@Entity
@Table(name = "t_todo")
public class Todo extends BaseEntity{

    private String name;
    private boolean done;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

}
