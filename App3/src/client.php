<?php include("seguro.php"); ?>

<!DOCTYPE html>
<html lang="en" data-footer="true" data-scrollspy="true">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <title>Telemas | Perfil Cliente</title>
  <meta name="description" content="Perfil del cliente en Telemas" />

  <?php include("header.php"); ?>
</head>

<body>
  <div id="root">
    <?php include("navbar.php"); ?>

    <main>
      <div id="spinner-div">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col">
            <!-- Title and Top Buttons Start -->
            <div class="page-title-container">
              <div class="row">
                <!-- Title Start -->
                <div class="col-12 col-md-7">
                  <div class="d-flex align-items-center">
                    <h1 class="mb-0 pb-0 display-4 me-3">
                      <span style="color:rgb(1, 7, 8);">Cliente</span> / 
                      <span class="text-primary" id="clientName">Marco Antonio Martínez</span>
                    </h1>
                    <!-- Botón junto al nombre -->
                    <div class="dropdown">
                      <button class="btn btn-primary btn-icon btn-icon-start dropdown-toggle" type="button" 
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <i data-acorn-icon="plus"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Crear Servicio</a></li>
                        <li><a class="dropdown-item" href="#">Crear Factura</a></li>
                        <li><a class="dropdown-item" href="#">Crear Ticket</a></li>
                      </ul>
                    </div>
                  </div>
                  <nav class="breadcrumb-container d-inline-block" aria-label="breadcrumb">
                    <ul class="breadcrumb pt-0">
                      <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                      <li class="breadcrumb-item"><a href="#">CRM</a></li>
                      <li class="breadcrumb-item"><a href="Customers.php">Clientes</a></li>
                      <li class="breadcrumb-item active" aria-current="page" id="breadcrumbName">Marco Antonio Martínez</li>
                    </ul>
                  </nav>
                </div>
                <!-- Title End -->

                <!-- Top Buttons Start -->
                
                  
                  
                
                <!-- Top Buttons End -->
              </div>
            </div>
            <!-- Title and Top Buttons End -->

            <!-- Tabs Navigation -->
            <ul class="nav nav-tabs mb-4" id="clientTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="general-tab" data-bs-toggle="tab" 
                        data-bs-target="#general" type="button" role="tab">Vista General</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="facturas-tab" data-bs-toggle="tab" 
                        data-bs-target="#facturas" type="button" role="tab">Facturas</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pagos-tab" data-bs-toggle="tab" 
                        data-bs-target="#pagos" type="button" role="tab">Pagos</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="documentos-tab" data-bs-toggle="tab" 
                        data-bs-target="#documentos" type="button" role="tab">Documentos</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tickets-tab" data-bs-toggle="tab" 
                        data-bs-target="#tickets" type="button" role="tab">Tickets</button>
              </li>
            </ul>

            <!-- Tab Content -->
            <div class="tab-content" id="clientTabContent">
              <!-- Vista General Tab -->
              <div class="tab-pane fade show active" id="general" role="tabpanel">
                <div class="row">
                  <!-- Left Column -->
                  <div class="col-md-8">
                    <!-- Service Creation Card -->
                    <div class="card mb-4">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                          <div class="me-3">
                            <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 60px; height: 60px;">
                              <i data-acorn-icon="globe" class="text-white" style="font-size: 24px;"></i>
                            </div>
                          </div>
                          <div>
                            <h5 class="mb-1">Crear un Servicio para <span id="serviceClientName">Marco Antonio</span></h5>
                            <button class="btn btn-primary btn-sm">
                              <i data-acorn-icon="plus" class="me-1"></i>
                              Servicio
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Activity Log -->
                    <div class="card">
                      <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">REGISTROS</h5>
                        <div>
                          
                           
                        </div>
                      </div>
                      <div class="card-body">
                        <!-- New Entry Input -->
                        <div class="d-flex mb-4">
                          <div class="me-3">
                            <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 32px; height: 32px;">
                              <i data-acorn-icon="user" class="text-white" style="font-size: 14px;"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <input type="text" class="form-control" placeholder="Nueva entrada para el registro del cliente">
                          </div>
                          <button class="btn btn-primary ms-2">ENVIAR</button>
                        </div>

                        <!-- Activity Items -->
                        <div id="activityLog">
                          <!-- Activity items will be populated by JavaScript -->
                        </div>

                        <!-- Pagination -->
                        <div class="d-flex justify-content-between align-items-center mt-4">
                          <span class="text-muted">Mostrar hasta 5</span>
                          <div>
                            <span class="me-3">1-5 de 7</span>
                            <button class="btn btn-outline-secondary btn-sm me-1">
                              <i data-acorn-icon="chevron-left"></i>
                            </button>
                            <button class="btn btn-outline-secondary btn-sm">
                              <i data-acorn-icon="chevron-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div class="col-md-4">
                    <!-- Client Info Card -->
                    <div class="card mb-4">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                          <div class="me-3">
                            <div class="bg-success rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                                 style="width: 60px; height: 60px; font-size: 18px;" id="clientInitials">
                              MA
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h5 class="mb-1" id="clientFullName">Marco Antonio Martínez</h5>
                            <button class="btn btn-link btn-sm p-0 text-primary">
                              <i data-acorn-icon="plus" class="me-1"></i>
                              AÑADIR ETIQUETA DE CLIENTE
                            </button>
                          </div>
                          <button class="btn btn-outline-secondary btn-sm">
                            <i data-acorn-icon="edit"></i>
                          </button>
                        </div>

                        <div class="row g-2 mb-3">
                          <div class="col-6">
                            <label class="form-label text-muted small">ID de Cliente</label>
                            <div class="fw-bold" id="clientId">44006</div>
                          </div>
                          <div class="col-6">
                            <label class="form-label text-muted small">Teléfono</label>
                            <div class="fw-bold" id="clientPhone">Tel.55 2849 4127, 386 126 3048</div>
                          </div>
                        </div>

                        <div class="mb-3">
                          <label class="form-label text-muted small">Email</label>
                          <div class="fw-bold" id="clientEmail">No especificado</div>
                        </div>

                        <div class="mb-3">
                          <label class="form-label text-muted small">Dirección</label>
                          <div class="small" id="clientAddress">
                            Referencia en la calle Adolfo López Mateos con dirección a xocopa después de las secundaria ahí una ferretería después ahí una entrada de pinos en 200 metros está mi casa
                          </div>
                          <button class="btn btn-link btn-sm p-0 text-primary mt-1">mostrar más</button>
                        </div>

                        <div class="mb-3">
                          <label class="form-label text-muted small">Notas</label>
                          <div class="small" id="clientNotes">Sin notas</div>
                        </div>
                      </div>
                    </div>

                    <!-- Next Invoice Preview -->
                    <div class="card mb-4">
                      <div class="card-header">
                        <h6 class="mb-0">VISTA PREVIA DE LA SIGUIENTE FACTURA</h6>
                      </div>
                      <div class="card-body text-center py-5">
                        <div class="mb-3">
                          <i data-acorn-icon="file-text" class="text-muted" style="font-size: 48px;"></i>
                        </div>
                        <p class="text-muted">No hay facturas programadas</p>
                      </div>
                    </div>

                    <!-- Tasks -->
                    <div class="card">
                      <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">TAREAS</h6>
                        <div>
                          <button class="btn btn-link btn-sm text-primary p-0 me-3">AÑADIR TAREA</button>
                          <button class="btn btn-link btn-sm text-primary p-0">VER TODOS</button>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="text-center py-3">
                          <p class="text-muted mb-0">No hay tareas pendientes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Other Tabs (Facturas, Pagos, etc.) -->
              <div class="tab-pane fade" id="facturas" role="tabpanel">
                <div class="card">
                  <div class="card-body text-center py-5">
                    <i data-acorn-icon="file-text" class="text-muted mb-3" style="font-size: 48px;"></i>
                    <h5>No hay facturas</h5>
                    <p class="text-muted">Este cliente no tiene facturas registradas.</p>
                    <button class="btn btn-primary">
                      <i data-acorn-icon="plus" class="me-1"></i>
                      Crear Factura
                    </button>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="pagos" role="tabpanel">
                <div class="card">
                  <div class="card-body text-center py-5">
                    <i data-acorn-icon="credit-card" class="text-muted mb-3" style="font-size: 48px;"></i>
                    <h5>No hay pagos</h5>
                    <p class="text-muted">Este cliente no tiene pagos registrados.</p>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="documentos" role="tabpanel">
                <div class="card">
                  <div class="card-body text-center py-5">
                    <i data-acorn-icon="folder" class="text-muted mb-3" style="font-size: 48px;"></i>
                    <h5>No hay documentos</h5>
                    <p class="text-muted">Este cliente no tiene documentos registrados.</p>
                    <button class="btn btn-primary">
                      <i data-acorn-icon="upload" class="me-1"></i>
                      Subir Documento
                    </button>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="tickets" role="tabpanel">
                <div class="card">
                  <div class="card-body text-center py-5">
                    <i data-acorn-icon="help-circle" class="text-muted mb-3" style="font-size: 48px;"></i>
                    <h5>No hay tickets</h5>
                    <p class="text-muted">Este cliente no tiene tickets de soporte.</p>
                    <button class="btn btn-primary">
                      <i data-acorn-icon="plus" class="me-1"></i>
                      Crear Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Scripts -->
  <script src="js/vendor/jquery-3.5.1.min.js"></script>
  <script src="js/vendor/bootstrap.bundle.min.js"></script>
  <script src="js/vendor/OverlayScrollbars.min.js"></script>
  <script src="js/vendor/autoComplete.min.js"></script>
  <script src="js/vendor/clamp.min.js"></script>

  <script src="icon/acorn-icons.js"></script>
  <script src="icon/acorn-icons-interface.js"></script>

  <script src="js/cs/scrollspy.js"></script>
  <script src="js/vendor/select2.full.min.js"></script>

  <script src="js/base/helpers.js"></script>
  <script src="js/base/globals.js"></script>
  <script src="js/base/nav.js"></script>
  <script src="js/base/search.js"></script>
  <script src="js/base/settings.js"></script>

  <script src="js/common.js"></script>
  <script src="js/scripts.js"></script>

  <script>
    $(document).ready(function() {
      // Cargar datos del cliente desde URL params o localStorage
      loadClientData();
      
      // Cargar actividad del cliente
      loadActivityLog();
    });

    function loadClientData() {
      // Obtener datos del cliente desde parámetros de URL o localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const clientData = {
        nombre: urlParams.get('nombre') || 'Marco Antonio',
        apellido: urlParams.get('apellido') || 'Martínez',
        email: urlParams.get('email') || '',
        telefono: urlParams.get('telefono') || 'Tel.55 2849 4127',
        direccion: urlParams.get('direccion') || 'Dirección no especificada',
        clientId: urlParams.get('clientId') || '44006',
        nota: urlParams.get('nota') || ''
      };

      // Actualizar la interfaz con los datos del cliente
      updateClientInterface(clientData);
    }

    function updateClientInterface(data) {
      const fullName = `${data.nombre} ${data.apellido}`;
      const initials = `${data.nombre.charAt(0)}${data.apellido.charAt(0)}`.toUpperCase();

      // Actualizar elementos de la página
      $('#clientName').text(fullName);
      $('#breadcrumbName').text(fullName);
      $('#clientFullName').text(fullName);
      $('#serviceClientName').text(data.nombre);
      $('#clientInitials').text(initials);
      $('#clientId').text(data.clientId);
      $('#clientPhone').text(data.telefono);
      $('#clientEmail').text(data.email || 'No especificado');
      $('#clientAddress').text(data.direccion);
      $('#clientNotes').text(data.nota || 'Sin notas');

      // Actualizar título de la página
      document.title = `Telemas | ${fullName}`;
    }

    function loadActivityLog() {
      const activities = [
        {
          icon: 'mail',
          type: 'success',
          message: 'Enviado (Job has been assigned to you)',
          date: ''
        },
        {
          icon: 'settings',
          type: 'info',
          user: '',
          message: '',
          date: ''
        }
        
        
      ];

      const logContainer = $('#activityLog');
      logContainer.empty();

      activities.forEach(activity => {
        const iconColor = activity.type === 'success' ? 'text-success' : 
                         activity.type === 'danger' ? 'text-danger' : 'text-muted';
        
        const activityHtml = `
          <div class="d-flex mb-3">
            <div class="me-3">
              <i data-acorn-icon="${activity.icon}" class="${iconColor}"></i>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  ${activity.user ? `<strong>${activity.user}</strong><br>` : ''}
                  <span class="${activity.type === 'success' ? 'text-success' : activity.type === 'danger' ? 'text-danger' : ''}">
                    ${activity.message}
                  </span>
                </div>
                <small class="text-muted">${activity.date}</small>
              </div>
            </div>
          </div>
        `;
        logContainer.append(activityHtml);
      });
    }

    // Función para recibir datos del formulario de cliente
    function receiveClientData(clientData) {
      updateClientInterface(clientData);
      loadActivityLog();
      
      // Agregar entrada de registro para cliente recién creado
      const currentDate = new Date().toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const newActivity = `
        <div class="d-flex mb-3">
          <div class="me-3">
            <i data-acorn-icon="user-plus" class="text-success"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <span class="text-success">Cliente creado exitosamente</span>
                ${clientData.nota ? `<br><small class="text-muted">Nota: ${clientData.nota}</small>` : ''}
              </div>
              <small class="text-muted">${currentDate}</small>
            </div>
          </div>
        </div>
      `;
      
      $('#activityLog').prepend(newActivity);
    }
  </script>
</body>
</html>