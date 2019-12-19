import { Component } from '@angular/core';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ref = firebase.database().ref();
  carros: any = [];

  constructor(
    private alertController: AlertController
  ) {
    console.log('simon');
    this.ref.on('value', response => {
      // tslint:disable-next-line: no-use-before-declare
      let datos = snapshotToArray(response);
      console.log(datos);
      this.carros = datos;
      // console.log(datos);
    });
  }

  async add() {
    const alert = await this.alertController.create({
      header: 'Agregar Carro',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Marca del carro'
        },
        {
          name: 'color',
          type: 'text',
          placeholder: 'Color'
        },
        {
          name: 'modelo',
          type: 'text',
          placeholder: 'Modelo'
        }

      ],
      buttons: [
        {
          text: 'Agregar',
          handler: (data) => {
            console.log(' Confirm Ok', data);
            let insert = this.ref.push();
            insert.set(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async edit(carro: any) {
    const alert = await this.alertController.create({
      header: 'Editar Carro',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: carro.name
        },
        {
          name: 'color',
          type: 'text',
          placeholder: 'Color',
          value: carro.color
        },
        {
          name: 'modelo',
          type: 'text',
          placeholder: 'Modelo',
          value: carro.modelo
        }
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: (data) => {
            console.log(' Confirm Ok', data);
            firebase.database().ref(carro.key).update(data);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(carro: any) {
    console.log(carro.key);
    firebase.database().ref(carro.key).remove();
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};
