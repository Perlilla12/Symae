// mock-data.js - Simulación de datos para desarrollo frontend

// Datos de clientes de prueba que replican el diseño real
let mockClients = [
    {
        id: 47004,
        idUCRM: '47004',
        nombre: 'Luis Perez Barraza',
        email: 'luis.perez@email.com',
        telefono: '55-1234-5678',
        direccion: 'Av. Principal 123, Col. Centro',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-01-15',
        tipo: '1' // 1 = Internet, 2 = Fibra
    },
    {
        id: 52584,
        idUCRM: '52584',
        nombre: 'Elisa Medina Morales',
        email: 'elisa.medina@email.com',
        telefono: '55-9876-5432',
        direccion: 'Calle Secundaria 456, Col. Norte',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-02-20',
        tipo: '1'
    },
    {
        id: 23140,
        idUCRM: '23140',
        nombre: 'Alejandro Avilez Muñoz',
        email: 'alejandro.avilez@email.com',
        telefono: '55-5555-1234',
        direccion: 'Blvd. Tecnológico 789, Col. Industrial',
        saldo: 0.00,
        plan: '-------',
        status: 'Activo',
        fechaRegistro: '2024-03-10',
        tipo: '1'
    },
    {
        id: 52583,
        idUCRM: '52583',
        nombre: 'Concepcion Alfredo Ramirez Rodriguez',
        email: 'concepcion.ramirez@email.com',
        telefono: '55-7777-8888',
        direccion: 'Privada Los Pinos 321, Col. Residencial',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-04-05',
        tipo: '2', // Fibra
        tipoLabel: 'Fibra'
    },
    {
        id: 53254,
        idUCRM: '53254',
        nombre: 'Aida Galvez Silva',
        email: 'aida.galvez@email.com',
        telefono: '55-3333-4444',
        direccion: 'Av. Constitución 654, Col. Centro Histórico',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-05-12',
        tipo: '2', // Fibra
        tipoLabel: 'Fibra'
    },
    {
        id: 52581,
        idUCRM: '52581',
        nombre: 'Evelyn Ortiz Fragoso',
        email: 'evelyn.ortiz@email.com',
        telefono: '55-1111-2222',
        direccion: 'Calle Las Flores 987, Col. Jardines',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-06-01',
        tipo: '2', // Fibra
        tipoLabel: 'Fibra'
    },
    {
        id: 52580,
        idUCRM: '52580',
        nombre: 'Jarwit Ivan Gonzalez Medina',
        email: 'jarwit.gonzalez@email.com',
        telefono: '55-8888-9999',
        direccion: 'Av. Reforma 456, Col. Moderna',
        saldo: 0.00,
        plan: '----------',
        status: 'Activo',
        fechaRegistro: '2024-06-15',
        tipo: '2', // Fibra
        tipoLabel: 'Fibra'
    }
];

// Métodos de pago de prueba
const mockPaymentMethods = [
    { id: 1, name: 'Efectivo' },
    { id: 2, name: 'Tarjeta de Crédito' },
    { id: 3, name: 'Tarjeta de Débito' },
    { id: 4, name: 'Transferencia Bancaria' },
    { id: 5, name: 'PayPal' },
    { id: 6, name: 'OXXO' }
];

// Función para simular la carga de clientes con el diseño moderno
function LClients(searchTerm = '') {
    console.log('Cargando clientes de prueba...');
    
    // Filtrar clientes si hay término de búsqueda
    let filteredClients = mockClients;
    if (searchTerm && searchTerm.trim() !== '') {
        filteredClients = mockClients.filter(client => 
            client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.idUCRM.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Generar HTML de la tabla con el diseño moderno
    const tbody = document.querySelector('#tbl_clients tbody');
    if (!tbody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }
    
    tbody.innerHTML = '';
    
    filteredClients.forEach(client => {
        const fibraLabel = client.tipo === '2' ? '<span class="badge bg-info text-white ms-2">Fibra</span>' : '';
        
        const row = `
            <tr>
                <td class="text-muted">${client.idUCRM}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <span>${client.nombre}</span>
                        ${fibraLabel}
                    </div>
                </td>
                <td class="text-muted">$${client.saldo.toFixed(2)}</td>
                <td class="text-muted">${client.plan}</td>
                <td>
                    <!-- Solo botón de registrar pago (verde) -->
                    <button type="button" 
                            class="btn btn-sm btn-outline-success rounded-circle p-2" 
                            onclick="GetData('${client.idUCRM}', '${client.nombre}', '${client.id}')" 
                            data-bs-toggle="modal" 
                            data-bs-target="#modal-checkout"
                            title="Registrar pago"
                            style="width: 32px; height: 32px;">
                        <i data-acorn-icon="dollar-sign" class="icon-12"></i>
                    </button>
                </td>
                <td>
                    <!-- Botón de ver estado de conexión (azul) -->
                    <button type="button" 
                            class="btn btn-sm btn-outline-primary rounded-circle p-2" 
                            onclick="GetStatus('${client.idUCRM}', '${client.nombre}', '${client.id}', '${client.tipo}')" 
                            data-bs-toggle="modal" 
                            data-bs-target="#modal-status"
                            title="Ver estado de conexión"
                            style="width: 32px; height: 32px;">
                        <i data-acorn-icon="eye" class="icon-12"></i>
                    </button>
                </td>
                <td>
                    <div class="d-flex gap-2">
                        <!-- Botón de editar (naranja/warning) -->
                        <button type="button" 
                                class="btn btn-sm btn-outline-warning rounded-circle p-2" 
                                onclick="editClient('${client.id}')" 
                                title="Editar cliente"
                                style="width: 32px; height: 32px;">
                            <i data-acorn-icon="edit" class="icon-12"></i>
                        </button>
                        
                        <!-- Dropdown menu con más opciones -->
                        <div class="dropdown">
                            <button class="btn btn-sm btn-outline-light rounded-circle p-2" 
                                    type="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                    style="width: 32px; height: 32px;">
                                <i data-acorn-icon="more-vertical" class="icon-12"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" onclick="viewClient('${client.id}')">
                                    <i data-acorn-icon="user" class="me-2"></i>Ver Perfil</a></li>
                                <li><a class="dropdown-item" href="#" onclick="viewHistory('${client.id}')">
                                    <i data-acorn-icon="clock" class="me-2"></i>Historial</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="#" onclick="deleteClient('${client.id}')">
                                    <i data-acorn-icon="trash-2" class="me-2"></i>Eliminar</a></li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Actualizar contador de items
    const itemCountElement = document.getElementById('itemCount');
    if (itemCountElement) {
        itemCountElement.textContent = `${filteredClients.length} Items`;
    }
    
    console.log(`${filteredClients.length} clientes cargados`);
}

// Función para simular la carga de métodos de pago
function LMethod() {
    console.log('Cargando métodos de pago...');
    
    const select = document.getElementById('Select_Method');
    if (!select) {
        console.error('No se encontró el select de métodos de pago');
        return;
    }
    
    select.innerHTML = '<option value="">Seleccionar método...</option>';
    
    mockPaymentMethods.forEach(method => {
        const option = document.createElement('option');
        option.value = method.id;
        option.textContent = method.name;
        select.appendChild(option);
    });
}

// Función para ver el perfil de un cliente
function viewClient(clientId) {
    const client = mockClients.find(c => c.id == clientId);
    if (client) {
        // Redirigir a la página de perfil del cliente
        window.location.href = `client.php?id=${clientId}`;
    }
}

// Función para editar un cliente
function editClient(clientId) {
    const client = mockClients.find(c => c.id == clientId);
    if (client) {
        // Redirigir a la página de edición
        window.location.href = `add-client.php?id=${clientId}&action=edit`;
    }
}

// Función para ver historial de un cliente
function viewHistory(clientId) {
    const client = mockClients.find(c => c.id == clientId);
    if (client) {
        // Redirigir a la página de historial
        window.location.href = `client-history.php?id=${clientId}`;
    }
}

// Función para eliminar un cliente
function deleteClient(clientId) {
    const client = mockClients.find(c => c.id == clientId);
    if (!client) return;
    
    $.confirm({
        title: 'Eliminar Cliente',
        content: `¿Está seguro de eliminar al cliente <strong>${client.nombre}</strong>?<br>Esta acción no se puede deshacer.`,
        type: 'red',
        buttons: {
            confirmar: {
                text: 'Eliminar',
                btnClass: 'btn-danger',
                action: function() {
                    // Simular eliminación
                    mockClients = mockClients.filter(c => c.id != clientId);
                    
                    // Recargar tabla
                    LClients(document.getElementById('txtbuscacli').value || '');
                    
                    // Mostrar mensaje de éxito
                    $.alert({
                        title: 'Cliente Eliminado',
                        content: 'El cliente ha sido eliminado exitosamente.',
                        type: 'green'
                    });
                }
            },
            cancelar: {
                text: 'Cancelar',
                btnClass: 'btn-secondary'
            }
        }
    });
}

// Función para obtener un cliente por ID
function getClientById(clientId) {
    return mockClients.find(c => c.id == clientId);
}

// Función para agregar un nuevo cliente
function addClient(clientData) {
    const newId = Math.max(...mockClients.map(c => c.id)) + 1;
    const newClient = {
        id: newId,
        idUCRM: String(newId),
        ...clientData,
        fechaRegistro: new Date().toISOString().split('T')[0],
        saldo: 0.00,
        status: 'Activo',
        plan: '----------'
    };
    
    mockClients.push(newClient);
    return newClient;
}

// Función para actualizar un cliente
function updateClient(clientId, clientData) {
    const index = mockClients.findIndex(c => c.id == clientId);
    if (index !== -1) {
        mockClients[index] = { ...mockClients[index], ...clientData };
        return mockClients[index];
    }
    return null;
}

// Función para simular el estado de un cliente estático
function GetStatusStatic(idUCRM, idcli) {
    const client = mockClients.find(c => c.id == idcli);
    if (!client) return;
    
    const statusData = `
        <div class="alert alert-info">
            <h5>Información de Conexión - ${client.nombre}</h5>
            <hr>
            <table class="table table-sm">
                <tr>
                    <th>STATUS:</th>
                    <td><span class="badge bg-success">Activo</span></td>
                </tr>
                <tr>
                    <th>MODE:</th>
                    <td>STATIC - 192.168.1.100 <i class="text-success bi-globe"></i></td>
                </tr>
                <tr>
                    <th>CPE:</th>
                    <td>LiteBeam 5AC - E0:63:DA:FA:6F:93 <i class="text-success bi-check-circle-fill"></i></td>
                </tr>
                <tr>
                    <th>SIGNAL:</th>
                    <td>-55 dBm / -58 dBm <i class="text-success bi-reception-4"></i></td>
                </tr>
                <tr>
                    <th>ACCESS POINT:</th>
                    <td>Torre_Central_AP01</td>
                </tr>
                <tr>
                    <th>SITE:</th>
                    <td>Centro</td>
                </tr>
            </table>
        </div>
    `;
    
    document.getElementById('tblstatusClient').innerHTML = statusData;
}

// Función para simular el estado de un cliente de fibra
function GetStatusFiber(idUCRM, idcli) {
    const client = mockClients.find(c => c.id == idcli);
    if (!client) return;
    
    const statusData = `
        <div class="alert alert-success">
            <h5>Información de Conexión Fibra - ${client.nombre}</h5>
            <hr>
            <table class="table table-sm">
                <tr>
                    <th>STATUS:</th>
                    <td><span class="badge bg-success">Activo</span></td>
                </tr>
                <tr>
                    <th>MODE:</th>
                    <td>FIBER - DHCP <i class="text-success bi-globe"></i></td>
                </tr>
                <tr>
                    <th>ONT:</th>
                    <td>Huawei HG8240H - 48:57:02:89:67:45 <i class="text-success bi-check-circle-fill"></i></td>
                </tr>
                <tr>
                    <th>OPTICAL POWER:</th>
                    <td>-12.5 dBm <i class="text-success bi-reception-4"></i></td>
                </tr>
                <tr>
                    <th>OLT PORT:</th>
                    <td>PON 1/1/8 - Puerto 32</td>
                </tr>
                <tr>
                    <th>CENTRAL:</th>
                    <td>Central Norte</td>
                </tr>
            </table>
        </div>
    `;
    
    document.getElementById('tblstatusClient').innerHTML = statusData;
}

// Función para simular el guardado de un pago
function SavePay(idUCRM, idcli, method, fecha, hora, auth, monto, notas, clientName) {
    console.log('Guardando pago simulado:', {
        idUCRM, idcli, method, fecha, hora, auth, monto, notas, clientName
    });
    
    // Simular delay de guardado
    setTimeout(() => {
        // Actualizar saldo del cliente
        const clientIndex = mockClients.findIndex(c => c.id == idcli);
        if (clientIndex !== -1) {
            mockClients[clientIndex].saldo += parseFloat(monto) || 0;
        }
        
        // Cerrar modal
        $('#modal-checkout').modal('hide');
        
        // Recargar tabla
        LClients(document.getElementById('txtbuscacli').value || '');
        
        // Mostrar mensaje de éxito
        $.alert({
            title: 'Pago Registrado',
            content: `El pago de $${monto} para ${clientName} ha sido registrado exitosamente.`,
            type: 'green'
        });
        
        // Limpiar formulario
        document.getElementById('txtaut').value = '';
        document.getElementById('txtmonto').value = '';
        document.getElementById('txtnotas').value = '';
        
    }, 1000);
}

console.log('Mock data loaded - Datos de prueba cargados');