# Configuración de Google Forms para Auto-diagnóstico VUCA

Este documento explica cómo configurar el formulario de Google Forms para recibir los datos de los usuarios y sus resultados del auto-diagnóstico.

## Pasos para configurar Google Forms

### 1. Crear el formulario en Google Forms

1. Ve a [Google Forms](https://forms.google.com)
2. Crea un nuevo formulario en blanco
3. Configura los siguientes campos en el mismo orden:

   | Campo | Tipo | Obligatorio | Descripción |
   |-------|------|-------------|-------------|
   | Nombre completo | Texto corto | Sí | Nombre del participante |
   | Empresa | Texto corto | Sí | Nombre de la empresa |
   | Cargo | Texto corto | Sí | Posición o cargo del participante |
   | País | Texto corto | Sí | País del participante |
   | Correo electrónico | Texto corto | Sí | Email del participante |
   | WhatsApp | Texto corto | No | Número de WhatsApp (opcional) |
   | Puntaje Total | Texto corto | Sí | Puntaje total del test (0-100) |
   | Nivel | Texto corto | Sí | Nivel obtenido (Madurez avanzada, Mejora táctica, Necesita transformación) |
   | Recomendaciones | Párrafo | Sí | Lista de recomendaciones generadas |
   | Fecha completado | Texto corto | Sí | Fecha y hora de completado |

### 2. Obtener los IDs de los campos

1. Abre el formulario en modo edición
2. Haz clic derecho en el primer campo (Nombre completo) y selecciona "Inspeccionar" o presiona `F12`
3. En el código HTML, busca el atributo `name` que tiene el formato `entry.XXXXXXXXXX`
4. Anota ese número para cada campo

**Ejemplo:**
```html
<input type="text" name="entry.1234567890" ...>
```
En este caso, el ID sería `entry.1234567890`

### 3. Configurar el código

Una vez que tengas todos los IDs, actualiza el archivo `src/services/googleForms.ts`:

1. Reemplaza `YOUR_FORM_ID` en `GOOGLE_FORMS_URL` con el ID de tu formulario:
   ```typescript
   const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/FORM_ID_AQUI/formResponse';
   ```

2. Actualiza los IDs en `FORM_FIELD_IDS` con los IDs reales de cada campo:
   ```typescript
   const FORM_FIELD_IDS = {
     nombre: 'entry.1234567890',        // ID del campo "Nombre completo"
     empresa: 'entry.9876543210',       // ID del campo "Empresa"
     cargo: 'entry.1111111111',         // ID del campo "Cargo"
     pais: 'entry.2222222222',          // ID del campo "País"
     correo: 'entry.3333333333',        // ID del campo "Correo electrónico"
     whatsapp: 'entry.4444444444',       // ID del campo "WhatsApp"
     puntajeTotal: 'entry.5555555555',  // ID del campo "Puntaje Total"
     nivel: 'entry.6666666666',         // ID del campo "Nivel"
     recomendaciones: 'entry.7777777777', // ID del campo "Recomendaciones"
     fechaCompletado: 'entry.8888888888' // ID del campo "Fecha completado"
   };
   ```

### 4. Configurar notificaciones por correo (Opcional)

Para recibir notificaciones cuando alguien complete el formulario:

1. En Google Forms, haz clic en los tres puntos (⋮) en la esquina superior derecha
2. Selecciona "Obtener notificaciones por correo electrónico de nuevas respuestas"
3. Configura la dirección de correo donde quieres recibir las notificaciones (puede ser director@k2sol.co)

### 5. Configurar envío automático de reporte por correo

Actualmente, el sistema envía los datos a Google Forms, pero para enviar el reporte completo por correo al usuario, necesitarás:

**Opción A: Usar Google Apps Script**
- Crear un script que se ejecute cuando se reciba una nueva respuesta
- El script puede generar un PDF y enviarlo por correo

**Opción B: Usar un servicio de email externo**
- Integrar con servicios como SendGrid, Mailgun, o similar
- Configurar un endpoint backend que envíe el correo

**Opción C: Manual (para empezar)**
- Los datos se guardan en Google Sheets
- Puedes crear un proceso manual o automatizado para enviar los reportes

## Notas importantes

- Los formularios de Google Forms tienen protección CORS, por lo que usamos `mode: 'no-cors'` en el fetch
- Con `no-cors`, no podemos verificar si el envío fue exitoso, pero normalmente funciona correctamente
- Asegúrate de que todos los campos obligatorios tengan sus IDs correctos
- El campo de WhatsApp es opcional, pero si el usuario lo proporciona, se incluirá en el envío

## Prueba

1. Completa el formulario de prueba en la aplicación
2. Verifica que los datos lleguen correctamente a Google Sheets (si tienes habilitada la hoja de cálculo)
3. Revisa que todos los campos se completen correctamente

## Solución de problemas

- **Los datos no se envían**: Verifica que los IDs de los campos sean correctos
- **Faltan campos**: Asegúrate de que todos los campos obligatorios estén configurados
- **Errores de CORS**: Esto es normal con Google Forms, el modo `no-cors` es necesario

