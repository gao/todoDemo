package com.tododemo.web;

import com.tododemo.dao.DaoRegistry;
import com.tododemo.dao.TodoDao;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class TodoWebHandlers {

    private DaoRegistry      daoRegistry;
    @Inject
    private TodoDao      todoDao;

    @Inject
    public TodoWebHandlers(DaoRegistry daoRegistry) {
        this.daoRegistry = daoRegistry;
    }



}
