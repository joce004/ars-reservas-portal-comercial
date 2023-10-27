export const siteMap = {
  inicio: {
    name: 'inicio',
    path: '/',
  },
  cotizaciones: {
    name: 'cotizaciones',
    path: 'cotizaciones',
    cotizadorPlanes: {
      name: 'cotizadorPlanes',
      path: 'cotizador-de-planes',
    },
    detalleCotizacion: {
      name: 'detalleCotizacion',
      path: 'detalle-cotizacion/:id',
    },
    editarCotizacion: {
      name: 'editarCotizacion',
      path: 'editar-cotizacion/:id',
    },
  },
  solicitudesServicios: {
    name: 'solicitudesServicios',
    path: 'solicitudes-de-servicios',
    nuevaSolicitudServicio: {
      name: 'nuevaSolicitudServicio',
      path: 'nueva-solicitud-servicio',
    },
    detalleSolicitudServicio: {
      name: 'detalleSolicitudServicio',
      path: 'detalle-solicitud-servicio/:id',
    },
  },
  catalogoServicios: {
    name: 'catalogoServicios',
    path: 'catalog-servicios',
  },
  empresas: {
    name: 'empresas',
    path: 'empresas',
  },
  biblioteca: {
    name: 'biblioteca',
    path: 'biblioteca',
  },
  seguridad: {
    name: 'seguridad',
    path: 'seguridad',
    seguridadUsuarioDetalle: {
      name: 'seguridadUsuarioDetalle',
      path: 'seguridad-usuario-detalle/:id',
    },
  },
} as const;


