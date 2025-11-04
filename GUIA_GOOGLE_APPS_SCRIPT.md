# 📧 Guía: Configurar Envío Automático de Emails con Google Apps Script

Esta guía te ayudará a configurar el envío automático de informes por correo electrónico a cada usuario que complete el autodiagnóstico VUCA.

---

## 🎯 ¿Qué hace este script?

Cuando alguien completa el autodiagnóstico y sus datos se envían al Google Form:
1. ✅ El script detecta automáticamente la nueva respuesta
2. ✅ Genera un informe completo en formato HTML profesional
3. ✅ Envía el email directamente al correo del usuario
4. ✅ No requiere intervención manual

---

## 📋 Requisitos Previos

- ✅ Tener acceso a tu Google Form: https://docs.google.com/forms/d/e/1FAIpQLSdu3AS1cjd3IJgf0dFz6smG83NoDtyGlXMWZJMG6dE88o-GWg/edit
- ✅ Estar logueado con la cuenta de **director@k2sol.co** (o la cuenta con permisos)
- ✅ Tener el formulario creado y funcionando correctamente

---

## 🚀 Pasos de Instalación

### Paso 1: Abrir el Editor de Scripts

1. Ve a tu Google Form en: https://docs.google.com/forms/d/e/1FAIpQLSdu3AS1cjd3IJgf0dFz6smG83NoDtyGlXMWZJMG6dE88o-GWg/edit
2. Haz clic en el menú de tres puntos (⋮) en la esquina superior derecha
3. Selecciona **"Scripts del editor de formularios"** (o "Apps Script")

   > 💡 **Nota:** Si no ves esta opción, haz clic en el ícono de ⚙️ (Configuración) y busca "Scripts" o "Apps Script"

---

### Paso 2: Pegar el Código del Script

1. En el editor de scripts que se abrió, deberías ver un archivo llamado `Código.gs` con una función básica
2. **Borra todo** el contenido existente en ese archivo
3. Abre el archivo `google-apps-script.js` de este proyecto
4. **Copia todo el contenido** del archivo
5. **Pega** el código completo en el editor de scripts de Google
6. Haz clic en **"Guardar"** 💾 (Ctrl+S o Cmd+S)

   > ✅ **Verificación:** Deberías ver el nombre del proyecto cambiar a "Sin título". Cámbialo a algo como "Envío de informes VUCA" y guarda de nuevo.

---

### Paso 3: Configurar el Trigger (Activador)

El trigger le dice al script **cuándo ejecutarse**. Necesitas configurarlo para que se ejecute automáticamente cuando alguien envía el formulario.

1. En el editor de scripts, haz clic en el icono del **reloj** ⏰ (llamado "Triggers") en el menú lateral izquierdo
   
   > Si no lo ves, ve a: **Triggers** → **Triggers** en el menú superior

2. Haz clic en el botón **"+ Agregar trigger"** en la parte inferior derecha

3. Configura el trigger con estos valores:
   
   ```
   Función a ejecutar:     onFormSubmit
   Origen del evento:      Desde formulario
   Tipo de evento:         Al enviar el formulario
   Fallo:                  Notificarme inmediatamente
   ```
   
   > ⚠️ **Importante:** Asegúrate de que:
   - "Función a ejecutar" sea exactamente `onFormSubmit`
   - "Origen del evento" sea "Desde formulario" (no "Desde la hoja de cálculo")
   - "Tipo de evento" sea "Al enviar el formulario"

4. Haz clic en **"Guardar"**

5. Es posible que Google te pida autorizar el script. Haz clic en **"Revisar permisos"** y autoriza el acceso:
   - ✅ Permitir que el script envíe emails en tu nombre
   - ✅ Permitir acceso al formulario para leer las respuestas

---

### Paso 4: Verificar que el Mapeo de Campos Sea Correcto

El script identifica los campos del formulario por su **título**. Asegúrate de que los títulos de tus campos en Google Forms sean claros y contengan palabras clave que el script pueda reconocer:

| Campo en el Script        | Palabras clave que busca                    | Ejemplo de título aceptable                      |
|---------------------------|---------------------------------------------|---------------------------------------------------|
| Nombre                    | "nombre", "nombre completo"                | ✅ "Nombre completo"                              |
| Empresa                   | "empresa"                                  | ✅ "Empresa"                                      |
| Cargo                     | "cargo"                                    | ✅ "Cargo"                                        |
| País                      | "país", "pais"                             | ✅ "País"                                         |
| Correo                    | "correo", "email", "e-mail"                | ✅ "Correo electrónico"                           |
| WhatsApp                  | "whatsapp"                                 | ✅ "WhatsApp (opcional)"                          |
| Puntaje Total             | "puntaje", "puntuación"                    | ✅ "Puntaje Total"                                |
| Nivel                     | "nivel"                                    | ✅ "Nivel"                                        |
| Recomendaciones           | "recomendaciones"                          | ✅ "Recomendaciones"                              |
| Fecha Completado          | "fecha", "completado"                      | ✅ "Fecha completado"                             |

#### Cómo verificar/ajustar los títulos de tus campos:

1. Ve a tu Google Form
2. Revisa cada pregunta y asegúrate de que los títulos contengan las palabras clave mencionadas arriba
3. Si algún campo tiene un título diferente, puedes:
   - **Opción A:** Cambiar el título del campo en Google Forms para que coincida
   - **Opción B:** Modificar el script en la función `onFormSubmit()` para agregar más palabras clave

---

### Paso 5: Probar el Script

1. **Envía una respuesta de prueba** a tu formulario desde el enlace público:
   - Usa un correo que puedas verificar (tu correo real o uno de prueba)
   - Completa todos los campos
   - Envía el formulario

2. **Espera unos segundos** (el script se ejecuta automáticamente)

3. **Revisa el correo del destinatario** (la bandeja de entrada y spam):
   - Deberías recibir un email con el informe completo en formato HTML
   - Si no lo recibes en 1-2 minutos, revisa la consola del script

4. **Revisar logs del script** (si no funcionó):
   - Ve al editor de scripts
   - Haz clic en **"Ejecutar"** → **"onFormSubmit"** (simulación manual - opcional)
   - O revisa los logs: **"Ver"** → **"Logs"** (Ctrl+Enter o Cmd+Enter)

---

## 🔍 Solución de Problemas

### ❌ El email no se envía

**Causa 1:** El trigger no está configurado correctamente
- ✅ Verifica que el trigger exista y esté activo
- ✅ Verifica que la función sea exactamente `onFormSubmit`
- ✅ Verifica que el tipo de evento sea "Al enviar el formulario"

**Causa 2:** Los permisos no están autorizados
- ✅ Ve a **Ejecutar** → **onFormSubmit** y autoriza los permisos si Google lo solicita

**Causa 3:** Los títulos de los campos no coinciden
- ✅ Revisa los logs del script (Ver → Logs)
- ✅ Verifica que los títulos de los campos contengan las palabras clave que el script busca

**Causa 4:** El correo del usuario no está en el formulario
- ✅ El script no enviará el email si el campo "Correo electrónico" está vacío

---

### ❌ Los datos del email no aparecen correctamente

**Solución:** Los títulos de los campos en Google Forms deben coincidir con las palabras clave que busca el script. Revisa la tabla en el Paso 4.

---

### ❌ Error: "No se encontró correo electrónico"

**Causa:** El campo de correo no se está leyendo correctamente.

**Solución:**
1. Verifica que el formulario tenga un campo de correo electrónico con un título que incluya "correo", "email" o "e-mail"
2. Abre los logs del script y revisa qué campos está leyendo
3. Si es necesario, ajusta las palabras clave en la función `onFormSubmit()` del script

---

### ❌ Error: "MailApp.sendEmail is not a function"

**Causa:** Falta autorizar permisos o hay un error de sintaxis.

**Solución:**
1. Ejecuta manualmente la función `onFormSubmit` desde el editor (Ejecutar → onFormSubmit)
2. Autoriza todos los permisos que Google solicite
3. Verifica que no haya errores de sintaxis (deberías ver una palomita verde ✓ en el editor)

---

## 📧 Personalizar el Email

Si quieres modificar el diseño o contenido del email:

1. Ve al editor de scripts
2. Busca la función `generarCuerpoEmailHTML()`
3. Modifica el contenido HTML según tus necesidades
4. Guarda los cambios
5. El próximo email enviado usará el nuevo diseño

---

## 🎨 Características del Email Generado

El email incluye:

✅ **Header con gradiente naranja** (marca K2 Solutions)  
✅ **Datos completos del participante** (nombre, empresa, cargo, país, correo, WhatsApp)  
✅ **Resultados destacados** (puntaje total y nivel con colores)  
✅ **Recomendaciones personalizadas** formateadas  
✅ **Call-to-Action para formación** (botón destacado)  
✅ **Información de contacto K2** (sitio web, correo)  
✅ **Diseño responsive** (se ve bien en móvil y desktop)  
✅ **Footer con fecha y copyright**

---

## 📊 Monitoreo y Logs

Para ver qué está pasando con el script:

1. Ve al editor de scripts
2. Haz clic en **"Ver"** → **"Logs"** (o presiona Ctrl+Enter)
3. Verás mensajes como:
   - `✅ Email enviado exitosamente a: correo@ejemplo.com`
   - `⚠️ No se encontró correo electrónico. No se enviará el email.`
   - `❌ Error al procesar el formulario: [mensaje de error]
`

---

## 🔄 Actualizar el Script

Si necesitas actualizar el script con mejoras:

1. Ve al editor de scripts
2. Reemplaza el código completo con la nueva versión
3. Guarda los cambios
4. El trigger seguirá funcionando automáticamente (no necesitas recrearlo)

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs del script primero
2. Verifica que todos los pasos de esta guía se hayan completado
3. Asegúrate de que los títulos de los campos coincidan con las expectativas del script

---

## ✅ Checklist Final

- [ ] Script pegado en el editor de Apps Script
- [ ] Script guardado con un nombre descriptivo
- [ ] Trigger configurado correctamente (`onFormSubmit`, "Al enviar el formulario")
- [ ] Permisos autorizados (enviar emails, leer formulario)
- [ ] Títulos de campos verificados (contienen palabras clave correctas)
- [ ] Prueba realizada y email recibido exitosamente

---

¡Listo! 🎉 Ahora cada vez que alguien complete el autodiagnóstico, recibirá automáticamente su informe completo por correo electrónico.


