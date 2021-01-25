import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { CustomRenderComponent } from '../custom-render/custom-render.component';

@Component({
  selector: 'app-tabla',
  template: `
    <ng2-smart-table [settings]="settings" 
                      [source]="data"
                      (createConfirm)="createOrUpdate($event)"
                      (editConfirm)="createOrUpdate($event)"
                      (deleteConfirm)="deleteById($event)"></ng2-smart-table>
    `,
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false
      },
      fullname: {
        title: 'Name',
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      cargo: {
        title: 'Puesto'
      },
      xhoras:{
        title: "Por horas",
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: 'Limpiar',
          },
        },

      }
    },
    add: {
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    delete: {
      confirmDelete: true
    }
  };

  data: Persona[] = [];
  constructor(
    private personaService : PersonaService
  ) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void{
    this.personaService.getPersonas()
      .subscribe(data => this.data = data); 
  }

  createOrUpdate(event: any) : void{
    //En realidad no confirmamos pero asi podemos acceder a .newData
    console.log("Creating or updating persona...");
    let persona: Persona = event.newData;
    this.personaService.createOrUpdate(persona)
      .subscribe(persona => this.data.push(persona));
    event.confirm.resolve();
  }

  deleteById(event: any) : void{
    if(window.confirm('Estás seguro de que quieres eliminar este elemento?')){      
      console.log("Deleting persona...");
      let id: number = event.data.id;
      this.data = this.data.filter(p => p.id !== id);
      this.personaService.deleteById(id).subscribe();
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
}
