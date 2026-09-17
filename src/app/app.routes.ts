import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'servicios',
    loadComponent: () => import('./pages/servicios/servicios.page').then((m) => m.ServiciosPage),
  },
  {
    path: 'servicios/:slug',
    loadComponent: () => import('./pages/servicios/servicio.page').then((m) => m.ServicioPage),
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos.page').then((m) => m.ProyectosPage),
  },
  {
    path: 'proceso',
    loadComponent: () => import('./pages/proceso/proceso.page').then((m) => m.ProcesoPage),
  },
  {
    path: 'recursos',
    loadComponent: () => import('./pages/recursos/recursos.page').then((m) => m.RecursosPage),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.page').then((m) => m.SobrePage),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then((m) => m.ContactoPage),
  },
  {
    path: 'aviso-legal',
    data: { documento: 'aviso-legal' },
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: 'privacidad',
    data: { documento: 'privacidad' },
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: 'cookies',
    data: { documento: 'cookies' },
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: 'accesibilidad',
    data: { documento: 'accesibilidad' },
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/no-encontrado/no-encontrado.page').then((m) => m.NoEncontradoPage),
  },
];
