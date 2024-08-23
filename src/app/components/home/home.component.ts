import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../../notes.service';

declare var $:any

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass , ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  noteList:any

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _NotesService = inject(NotesService)

  addNoteForm:FormGroup = this._FormBuilder.group({
    title : [null , [Validators.required]],
    content : [null , [Validators.required]]
  })

  updateNoteForm:FormGroup = this._FormBuilder.group({
    _id : [null],
    title : [null , [Validators.required]],
    content : [null , [Validators.required]]
  })

  ngOnInit(): void {
      this.getUserNotes()
  }

  addNote(){
    this._NotesService.addNote(this.addNoteForm.value).subscribe({
      next: (res)=>{
        console.log(res);

        $('#exampleModal').modal('hide')
        this.addNoteForm.reset()

        this.getUserNotes()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getUserNotes(){
    this._NotesService.getUserNotes().subscribe({
      next: (res)=>{
        console.log(res);
        this.noteList = res.notes

      },
      error:(err)=>{
        this.noteList = []
      }
    })
  }

  deleteNote(id:any){
    this._NotesService.deleteNote(id).subscribe({
      next: (res)=>{
        this.getUserNotes()

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  setUpdateNote(note:any){
    $('#updateModal').modal('show')
    this.updateNoteForm.patchValue(note)

    console.log(note);
    
  }

  updateNote(){

    const {title , content , _id} = this.updateNoteForm.value

    this._NotesService.updateNote( _id , {content , title}).subscribe({
      next: (res)=>{
        console.log(res);
        this.getUserNotes()
        $("#updateModal").modal("hide")
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
