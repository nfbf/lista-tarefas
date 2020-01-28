import { Component } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  //template: '<p>meu todo</p>'
  styleUrls: ['./app.component.css']
})
export class AppComponent {

public todos: Todo[] = []; // []
//public todos: any[]; undefined
public title:String='Lista de Tarefas';
public form:FormGroup;
public mode:String ='list';

constructor(private fb:FormBuilder) {
  
  this.form = this.fb.group ({
    title:['', Validators.compose([
    Validators.minLength(3),
    Validators.maxLength(60),
    Validators.required,

  ])]
  });

this.load();

}

add() {
 //this.form.value => {title ='title'}
const title = this.form.controls['title'].value;
const id = this.todos.length+1;
this.todos.push(new Todo (title,false,id))
this.save();
this.clear();
}


clear() {
this.form.reset();

}

remove (todo: Todo) {
const index = this.todos.indexOf(todo);
  if(index !== -1){
    this.todos.splice(index,1);
    this.save () 
  }
}

markAsDone(todo: Todo) {
  todo.done = true;
  this.save () 

}

markAsUndone(todo:Todo) {
  todo.done = false;
  this.save () ;

}

save () {

  const data =  JSON.stringify(this.todos);
  localStorage.setItem('todos',data);
  this.mode='list';
}

load() {
const data = localStorage.getItem('todos');

if(data){
this.todos = JSON.parse(data);
}  else {
 this.todos=[];
}
}

changeMode (mode:String) {
this.mode = mode;
}



}
