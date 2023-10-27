import MainLayoutVue from 'src/layouts/MainLayout.vue';
import ErrorNotFoundVue from 'src/pages/ErrorNotFound.vue';
import Index from 'src/pages/IndexPage.vue';
import Biblioteca from 'src/pages/biblioteca/BibliotecaPage.vue';
import Cotizaciones from 'src/pages/cotizador-planes/CotizacionesPage.vue';
import CotizadorPlanes from 'src/pages/cotizador-planes/CotizadorPlanes.vue';
import Login from 'src/pages/login/LoginPage.vue';
import Logout from 'src/pages/login/LogoutPage.vue';
import ChangePass from 'src/pages/login/ChangePassPage.vue';
import NuevaSolicitudServicios from 'src/pages/solicitudes-servicios/NuevaSolicitudServicios.vue';
import DetalleSolicitudServicio from 'src/pages/solicitudes-servicios/DetalleSolicitudServicio.vue';
import SolicitudesServicios from 'src/pages/solicitudes-servicios/SolicitudesServicios.vue';
import Empresas from 'src/pages/empresas/EmpresasPage.vue';
import Seguridad from 'src/pages/seguridad/SeguridadPage.vue';
import DetalleUsuarioPage from 'src/pages/seguridad/DetalleUsuarioPage.vue';
import CatalogoServicios from 'src/pages/catalogo-servicios/CatalogoServiciosPage.vue';
import { RouteRecordRaw } from 'vue-router';
import { AUTH_META } from 'src/boot/auth';
import { siteMap } from './siteMap';

const { GUEST, USER } = AUTH_META;

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { GUEST },
  },
  {
    path: '/',
    component: MainLayoutVue,
    children: [
      {
        path: siteMap.inicio.path,
        name: siteMap.inicio.name,
        component: Index,
        meta: { USER, displayName: 'Inicio', icon: 'fa-solid fa-house' },
      },
      {
        path: siteMap.solicitudesServicios.path,
        name: siteMap.solicitudesServicios.name,
        component: SolicitudesServicios,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.Read'],
          displayName: 'Solicitudes de Servicio',
          icon: 'fa-solid fa-handshake-angle',
          navItem: true,
        },
      },
      {
        path: siteMap.solicitudesServicios.nuevaSolicitudServicio.path,
        name: siteMap.solicitudesServicios.nuevaSolicitudServicio.name,
        component: NuevaSolicitudServicios,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.Create', 'ServiceRequestTypes.Read'],
          accessType: 'hard',
          displayName: 'Nueva Solicitud',
          icon: 'fa-solid fa-handshake-angle',
        },
      },
      {
        path: siteMap.solicitudesServicios.detalleSolicitudServicio.path,
        name: siteMap.solicitudesServicios.detalleSolicitudServicio.name,
        component: DetalleSolicitudServicio,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.Read'],
          displayName: 'Solicitud de Servicio',
          icon: 'fa-solid fa-handshake-angle',
        },
        props: true,
      },
      {
        path: siteMap.catalogoServicios.path,
        name: siteMap.catalogoServicios.name,
        component: CatalogoServicios,
        meta: {
          USER,
          requiredRoles: ['ServiceRequestTypes.Read'],
          displayName: 'Catálogo de Servicios',
          icon: 'fa-solid  fa-rectangle-list',
          navItem: true,
        },
      },
      {
        path: siteMap.cotizaciones.path,
        name: siteMap.cotizaciones.name,
        component: Cotizaciones,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.PlanQuoter'],
          displayName: 'Cotizaciones',
          icon: 'fa-solid fa-file-invoice-dollar',
          navItem: true,
        },
      },
      {
        path: siteMap.cotizaciones.cotizadorPlanes.path,
        name: siteMap.cotizaciones.cotizadorPlanes.name,
        component: CotizadorPlanes,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.PlanQuoter'],
          displayName: 'Cotizador de Planes',
          icon: 'fa-solid fa-file-invoice-dollar',

        },
      },
      {
        path: siteMap.cotizaciones.detalleCotizacion.path,
        name: siteMap.cotizaciones.detalleCotizacion.name,
        component: CotizadorPlanes,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.PlanQuoter'],
          displayName: 'Detalle Cotización',
          icon: 'fa-solid fa-file-invoice-dollar',
          readonly: true
        },
        props: true,
      },
      {
        path: siteMap.cotizaciones.editarCotizacion.path,
        name: siteMap.cotizaciones.editarCotizacion.name,
        component: CotizadorPlanes,
        meta: {
          USER,
          requiredRoles: ['ServiceRequests.PlanQuoter'],
          displayName: 'Editar Cotización',
          icon: 'fa-solid fa-file-invoice-dollar',
        },
        props: true,
      },
      {
        path: siteMap.empresas.path,
        name: siteMap.empresas.name,
        component: Empresas,
        meta: {
          USER,
          requiredRoles: ['Businesses.Read'],
          displayName: 'Intermediarios',
          icon: 'fa-solid fa-industry',
          navItem: true,
        },
      },
      {
        path: siteMap.biblioteca.path,
        name: siteMap.biblioteca.name,
        component: Biblioteca,
        meta: {
          USER,
          displayName: 'Biblioteca',
          icon: 'fa-solid fa-book-bookmark',
          navItem: true,
        },
      },
      {
        path: siteMap.seguridad.path,
        name: siteMap.seguridad.name,
        component: Seguridad,
        meta: {
          USER,
          requiredRoles: ['Users.Read', 'Roles.Read', 'RoleProfiles.Read'],
          accessType: 'soft',
          displayName: 'Seguridad',
          icon: 'fa-solid fa-shield-halved',
          navItem: true,
        },
      },
      {
        path: siteMap.seguridad.seguridadUsuarioDetalle.path,
        name: siteMap.seguridad.seguridadUsuarioDetalle.name,
        component: DetalleUsuarioPage,
        meta: {
          USER,
          requiredRoles: ['Users.Read'],
          displayName: 'Usuario',
          icon: 'fa-solid fa-user',
        },
        props: true,
      },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/cambiar-clave',
    name: 'cambiarClave',
    component: ChangePass,
    meta: { USER },
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFoundVue,
  },
];

export default routes;
