import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { SiteConfig, ConsultationRequest } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyAuzyWuNEhvlbmKvVI20kH3y_u79bVr1BA",
  authDomain: "aldo-leao.firebaseapp.com",
  projectId: "aldo-leao",
  storageBucket: "aldo-leao.firebasestorage.app",
  messagingSenderId: "628024774113",
  appId: "1:628024774113:web:c8da1936582721534716a0"
};

// Inicialização segura com padrão Singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

const CONFIG_DOC_PATH = { collection: 'site_settings', docId: 'current' };

/**
 * Salva as configurações completas do site no Firebase Firestore (Nuvem em tempo real)
 */
export async function saveSiteConfigToFirebase(config: SiteConfig): Promise<boolean> {
  try {
    const docRef = doc(db, CONFIG_DOC_PATH.collection, CONFIG_DOC_PATH.docId);
    await setDoc(docRef, {
      ...config,
      _updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[Firebase] Aviso ao salvar configurações no Firestore:', error);
    return false;
  }
}

/**
 * Ouve em tempo real qualquer alteração feita no site a partir de qualquer dispositivo
 */
export function subscribeToSiteConfig(onUpdate: (config: SiteConfig) => void): () => void {
  try {
    const docRef = doc(db, CONFIG_DOC_PATH.collection, CONFIG_DOC_PATH.docId);
    const unsubscribe = onSnapshot(
      docRef,
      (snap: any) => {
        if (snap && typeof snap.exists === 'function' && snap.exists()) {
          const data = snap.data() as SiteConfig;
          onUpdate(data);
        }
      },
      (error: any) => {
        console.warn('[Firebase] Aviso ao conectar listener do Firestore:', error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('[Firebase] Não foi possível iniciar o listener do Firestore:', error);
    return () => {};
  }
}

/**
 * Salva um pedido de agendamento / consulta jurídica na coleção de leads do Firestore
 */
export async function saveLeadToFirebase(lead: ConsultationRequest): Promise<boolean> {
  try {
    const leadId = lead.id || `lead-${Date.now()}`;
    const docRef = doc(db, 'leads', leadId);
    await setDoc(docRef, {
      ...lead,
      createdAt: lead.createdAt || new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.warn('[Firebase] Aviso ao registrar lead no Firestore:', error);
    return false;
  }
}
