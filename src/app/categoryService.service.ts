import { Injectable } from '@angular/core';
import { CategoryWord } from './shared/categoryWord';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  getNextId(): number {
    let nextId = 1;
    let nextIdFromStorage = localStorage.getItem("nextId");
    if (nextIdFromStorage != null) {
      nextId = parseInt(nextIdFromStorage);
    }
    return nextId;
  }


  add(category: CategoryWord) {
    let nextId = this.getNextId();


    category.id = nextId;
    localStorage.setItem(category.id.toString(), JSON.stringify(category));


    nextId++;
    localStorage.setItem("nextId", nextId.toString())
  }


  delete(id: number) {
    if (localStorage.getItem(id.toString()) != null) {
      localStorage.removeItem(id.toString())
    }
    else {
      throw new Error("delete() id " + id.toString() + " not found in localStorage");
    }
  }

  update(category: CategoryWord) {
    if (localStorage.getItem(category.id.toString()) != null) {
      category.last_change_date = new Date();
      localStorage.setItem(category.id.toString(), JSON.stringify(category));
      console.log(category);
      console.log(JSON.stringify(category));
    }
    else {
      throw new Error("update() id " + category.id.toString() + " not found in localStorage");
    }
  }


  get(id: number) {
    let category = localStorage.getItem(id.toString())
    if (category != null) {
      return JSON.parse(category);
    }
    throw new Error("get() id " + id.toString() + " not found in localStorage");
  }

  list(): CategoryWord[] {
    let result = [];
    let lastValidNumber = this.getNextId();

    for (let index = 0; index < lastValidNumber; index++) {
      try {
        let category = this.get(index);
        if (category != null) {
          result.push(category);
        }
      } catch (error) {
        console.log("list() error: " + error)
      }
    }

    return result;
  }
}


