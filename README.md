
## Proyecto de Clase: Sistema de Bienes Raíces
---
<p align="justify">
En este proyecto se prondan en ejemplo práctico la creación de API's propias así como el consumo de API´s de Terceros (Gestión de Mapas, Envío de Correos, Autentificación por Redes Sociales, Gestión de Bases de Datos, Gestión de Archivos, Seguridad, Control de Sesiónes y validaciones. En el contexto real de la compra, venta o renta de propiedades.</p>

---
#### Consideraciones:

<p align="justify">
El proyecto estará basado en una Arquitectura SOA (Service Oriented Architecture), el Patrón de Diseño MVC (Model, View, Controler) y servicios API REST, deberá gestionarse debidamente en el uso del contro de versiones y ramas progresivas del desarrollo del mismo.</p>


### Tabla de Secciones

|No.|Descripción|Potenciador|Estatus|
|---|---|---|---|
|1.| Configuración inicial del Proyecto (NodeJS)  | 2 | Finalizado |
|2.| Routing y Requests (Peticiones)  | 5 | Finalizado |
|3.| Layouts, Template Engines y Tailwind CSS (Frontend) | 5 | Finalizado |
|4.| Creación de páginas de Login y Creación de Usuarios | 6| Finalizado |
|5.| ORM's y Bases de Datos | 7 | Finalizado |
|6.| Insertando Registros en la Tabla Usuarios| 20 | Finalizado |
|7.| Implementación de la Fucnionalidad (Feature) Recuperación de Contraseña (Password Recovery)| 7 | Finalizado |
|8.| Autentificación de Usuarios (auth)| ❌ | ❌ |
|9.| Definición de Clase Propiedades (property)| ❌ | ❌ |
|10.| Operaciones CRUD (Create, Read, Update, Delete) de las Propuedades | ❌ | ❌ |
|11.| Proteción de Rutas y Validación de Tokes de Sesión (JWT) | ❌ | ❌ |
|12.| Añadir Imágenes a la Propiedad (Gestión de Archivos) | ❌ | ❌ |
|13.| Elaboración Panel de Administración (Dashboard)| ❌ | ❌ |
|14.| Formulario de Edición de Propiedades | ❌ | ❌ |
|15.| Formulario de Eliminación de Propiedades | ❌ | ❌ |
|16.| Página de Consulta de la Propiedad | ❌ | ❌ |
|17.| Implementación del Paginador | ❌ | ❌ |
|18.| Creando la Página Inicial (index)| ❌ | ❌ |
|19.| Creando las Páginas de Categorías y Páginas de Error (404) | ❌ | ❌ |
|20.| Envío de Email por un formulario de Contacto | ❌ | ❌ |
|21.| Cambiar el Estatus de una Propiedad | ❌ | ❌ |
|22.| Barras de Navegación y Cierre de Sesión | ❌ | ❌ |
|23.| Publicación del API y el Frontend | ❌ | ❌ |
# 🏡 Bienes Raíces 240755 – Módulo de Autenticación

## 📌 Descripción del Proyecto

Este proyecto corresponde al desarrollo del módulo de autenticación (Login, Registro, Recuperación de contraseña y Validación de usuario) para una plataforma web de gestión de bienes raíces.

El sistema permite a los usuarios:

* Registrarse en la plataforma
* Confirmar su cuenta mediante correo electrónico
* Iniciar sesión de forma segura
* Recuperar su contraseña
* Acceder a su panel de “Mis Propiedades”

Se implementaron validaciones tanto en frontend como en backend, así como manejo de errores dinámicos y control de acceso.

---

## ⚙️ Tecnologías Utilizadas

* Node.js
* Express
* Sequelize (MySQL)
* Pug
* Tailwind CSS
* Nodemailer
* express-validator
* bcrypt

---

## 🚀 Ejecución del Proyecto

1. Instalar dependencias:

```
npm install
```

2. Ejecutar el servidor:

```
npm run dev
```

3. Acceder en el navegador:

```
http://localhost:40755/auth/login
```

---

# 🧪 PRUEBAS DEL SISTEMA

---

## ✅ Test 1: Interacción Rotativa

**Objetivo:** Verificar la navegación entre Registro, Login y Recuperación.

**Procedimiento:**

1. Acceder a /auth/registro
2. Navegar a Login
3. Navegar a Recuperar contraseña
4. Regresar entre vistas

**Resultado esperado:** Todas las rutas funcionan correctamente sin errores.

**Evidencia:**
<img width="1919" height="1024" alt="image" src="https://github.com/user-attachments/assets/b4331632-929e-43fb-80e5-ce28ceda8682" />


<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/6e85a9a4-5324-4dea-8469-900ba23b22cf" />

<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/7cccd07f-e3e2-4339-8e59-edd0e737c21d" />


---

## ✅ Test 2: Registro Exitoso

**Objetivo:** Verificar que un usuario se registre correctamente.

**Procedimiento:**

1. Llenar formulario con datos válidos
2. Enviar formulario

**Resultado esperado:**

* Usuario creado en base de datos
* Mensaje de confirmación

**Evidencia:**

<img width="1919" height="1030" alt="image" src="https://github.com/user-attachments/assets/d6f6780b-410b-4f96-b01e-a5ed0275007a" />


<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/d907f293-2b96-41c0-abb6-7929c0b6894b" />


<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/bfa44f78-3b2c-4821-a746-a8fe0abbaf31" />


<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/a5beeb82-712d-4e00-9d84-b5fcfad88218" />



---

## ✅ Test 3: Registro Fallido (Formulario Incorrecto)

**Objetivo:** Validar errores en el formulario.

**Procedimiento:**

* Campos vacíos
* Email inválido
* Contraseña corta
* Confirmación incorrecta

**Resultado esperado:** Se muestran mensajes de error.

**Evidencia:**

<img width="1919" height="1072" alt="image" src="https://github.com/user-attachments/assets/d2976352-0599-464d-9070-e1de16195330" />


---

## ✅ Test 4: Registro con Correo Duplicado

**Objetivo:** Evitar registros duplicados.

**Procedimiento:**

1. Registrar usuario existente

**Resultado esperado:** Mensaje de error de duplicidad.

**Evidencia:**

<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/d06f9393-48aa-4cbf-8d35-5838bc8f81b7" />


---

## ✅ Test 5: Validación de Usuario por Email

**Objetivo:** Verificar confirmación de cuenta.

**Procedimiento:**

1. Intentar login sin confirmar
2. Confirmar cuenta mediante token

**Resultado esperado:**

* No permite login sin confirmar
* Permite acceso después de confirmar

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5fd57b1f-638e-4e46-8d21-b5e5d126903e" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/51d1f195-2733-44b3-8ae1-90d5a68cd97c" />



---

## ✅ Test 6: Recuperación de Contraseña Exitosa

**Objetivo:** Restablecer contraseña correctamente.

**Procedimiento:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/970bf6da-ed4d-4b1e-8d77-d92db4c8089a" />

<img width="1919" height="1077" alt="image" src="https://github.com/user-attachments/assets/ba7f854c-9f13-4706-b3b0-e595a40ddd3c" />



**Resultado esperado:** Contraseña actualizada correctamente.

**Evidencia:**

* Captura 1: Solicitud enviada
* Captura 2: Formulario nueva contraseña
* Captura 3: Mensaje de éxito

---

## ✅ Test 7: Recuperación Fallida (Usuario No Confirmado)

**Objetivo:** Evitar recuperación en cuentas no verificadas.

**Resultado esperado:** Mensaje de error.

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/07c91109-ec76-4dfd-96a6-aa63429abc32" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/d0107bb6-2bb5-4647-9328-8ef7efe4a863" />

---

## ✅ Test 8: Recuperación Fallida (Token Inválido / Formulario Incorrecto)

**Objetivo:** Validar seguridad del proceso.

**Procedimiento:**

* Token incorrecto
* Contraseñas inválidas

**Resultado esperado:** Sistema rechaza operación.

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2c5eab78-4a49-4355-bac6-68d6014d32c9" />

* Captura 2: Error formulario

---

## ✅ Test 9: Login Exitoso

**Objetivo:** Verificar acceso al sistema.

**Procedimiento:**

1. Login correcto

**Resultado esperado:**

* Redirección a “Mis Propiedades”
* Visualización de datos del usuario

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5217a0e0-a9ff-4978-9881-2a04c54fec98" />

---

## ✅ Test 10: Bloqueo de Cuenta

**Objetivo:** Bloquear usuario tras múltiples intentos fallidos.

**Procedimiento:**

1. Ingresar contraseña incorrecta 5 veces

**Resultado esperado:**

* Cuenta bloqueada
* Mensaje de error

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/294b1a6e-ccd8-41b2-aa19-230fd0324e8c" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/0be2e21b-5345-417c-b6e5-8f7b60ba9924" />



---

## ⭐ EXTRA: Desbloqueo de Cuenta

**Objetivo:** Permitir recuperar acceso.

**Resultado esperado:** Usuario desbloqueado correctamente.

**Evidencia:**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/f9ed3e7a-a060-4693-842b-6614269b219c" />


---



# 📌 Conclusión

El módulo de autenticación cumple con los requerimientos establecidos, implementando validaciones completas, control de acceso, recuperación de contraseña y manejo de errores, garantizando una experiencia de usuario segura y funcional.




### Creado por: 
Blanca Sarahi Melendez Torres - 240755 .
