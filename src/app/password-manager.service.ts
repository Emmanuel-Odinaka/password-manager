import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore, private auth: Auth,) {}

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadData() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }


  // Password Queries

  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPasswords(siteId:string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' })
  }

  updatePassword(data: object, siteId: string, passwordId: string,) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId)
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
