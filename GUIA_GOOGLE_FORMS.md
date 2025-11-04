# Guía Paso a Paso: Configurar Google Forms

## ⚠️ IMPORTANTE: Este formulario NO es para que los usuarios lo completen

Este formulario de Google Forms es un **formulario "backend"** o "oculto". Los usuarios **NO lo verán ni lo completarán manualmente**. 

La aplicación enviará automáticamente los datos a este formulario mediante código cuando el usuario complete el test.

## Paso 1: Crear el formulario

1. Ve a https://forms.google.com
2. Inicia sesión con tu cuenta de Google (director@k2sol.co)
3. Haz clic en el botón **"+"** o **"Crear un formulario"** (formulario en blanco)
4. Dale un título al formulario, por ejemplo: **"Auto-diagnóstico VUCA - Datos y Resultados"**
5. **Importante:** Este formulario será usado solo por la aplicación, los usuarios no lo verán

## Paso 2: Agregar los campos

La aplicación enviará automáticamente estos datos:
- **Datos del usuario** (que el usuario ingresa en la app)
- **Resultados del test** (que la app calcula automáticamente)

Agrega los siguientes campos **en este orden exacto**:

### Campo 1: Nombre completo
- Tipo: **Texto corto**
- Título: **"Nombre completo"**
- Obligatorio: ✅ Sí

### Campo 2: Empresa
- Tipo: **Texto corto**
- Título: **"Empresa"**
- Obligatorio: ✅ Sí

### Campo 3: Cargo
- Tipo: **Texto corto**
- Título: **"Cargo"**
- Obligatorio: ✅ Sí

### Campo 4: País
- Tipo: **Texto corto**
- Título: **"País"**
- Obligatorio: ✅ Sí

### Campo 5: Correo electrónico
- Tipo: **Texto corto**
- Título: **"Correo electrónico"**
- Obligatorio: ✅ Sí

### Campo 6: WhatsApp
- Tipo: **Texto corto**
- Título: **"WhatsApp"**
- Obligatorio: ❌ No (marcar como opcional)
- Descripción: **"(Opcional)"**

### Campo 7: Puntaje Total
- Tipo: **Texto corto**
- Título: **"Puntaje Total"**
- Obligatorio: ✅ Sí
- **Nota:** Este campo lo completa automáticamente la aplicación con el resultado del test

### Campo 8: Nivel
- Tipo: **Texto corto**
- Título: **"Nivel"**
- Obligatorio: ✅ Sí
- **Nota:** Este campo lo completa automáticamente la aplicación (Madurez avanzada, Mejora táctica, Necesita transformación)

### Campo 9: Recomendaciones
- Tipo: **Párrafo** (texto largo)
- Título: **"Recomendaciones"**
- Obligatorio: ✅ Sí
- **Nota:** Este campo lo completa automáticamente la aplicación con las recomendaciones generadas

### Campo 10: Fecha completado
- Tipo: **Texto corto**
- Título: **"Fecha completado"**
- Obligatorio: ✅ Sí
- **Nota:** Este campo lo completa automáticamente la aplicación con la fecha y hora en que se completó el test


## Paso 3: Guardar y obtener la URL del formulario

1. Haz clic en **"Enviar"** (botón azul arriba a la derecha)
2. Copia la URL del formulario (la que se muestra para compartir)
3. Debería verse algo como: `https://docs.google.com/forms/d/e/1ABC123XYZ789/viewform`
4. **Guarda esta URL**, la necesitarás después

## Paso 4: Obtener los IDs de los campos

### Método 1: Usando la herramienta de selección (RECOMENDADO)

1. Abre el formulario en modo **Vista previa** (icono del ojo 👁️)
2. Presiona **F12** para abrir las herramientas de desarrollador
3. En la parte superior izquierda de las herramientas, haz clic en el **icono de inspeccionar** (🔍 o cursor con cuadrado)
4. **Haz clic directamente sobre el primer campo** (Nombre completo) en el formulario
5. El código HTML se resaltará automáticamente mostrando algo como:
   ```html
   <input type="text" name="entry.1234567890" ...>
   ```
6. **Copia el valor completo** del atributo `name` (ejemplo: `entry.1234567890`)
7. **Repite para cada campo** haciendo clic sobre ellos uno por uno

### Método 2: Buscar en el código

1. Con las herramientas de desarrollador abiertas (F12)
2. Presiona **Ctrl+F** para buscar
3. Busca: `entry.`
4. Verás todos los campos con sus IDs listados
5. Anótalos en el **mismo orden** que aparecen en el formulario

**Importante:** Los IDs aparecen en el mismo orden que creaste los campos, así que:
- El primer `entry.XXXXX` que encuentres = Campo 1 (Nombre completo)
- El segundo `entry.XXXXX` = Campo 2 (Empresa)
- Y así sucesivamente...

**Anota los IDs aquí:**

- Campo 1 (Nombre completo): `entry.___________`
- Campo 2 (Empresa): `entry.___________`
- Campo 3 (Cargo): `entry.___________`
- Campo 4 (País): `entry.___________`
- Campo 5 (Correo): `entry.___________`
- Campo 6 (WhatsApp): `entry.___________`
- Campo 7 (Puntaje Total): `entry.___________`
- Campo 8 (Nivel): `entry.___________`
- Campo 9 (Recomendaciones): `entry.___________`
- Campo 10 (Fecha completado): `entry.___________`

## Paso 5: Conseguir el Form ID

De la URL que copiaste antes:
- Si la URL es: `https://docs.google.com/forms/d/e/1ABC123XYZ789/viewform`
- El Form ID es: `1ABC123XYZ789`

## Paso 6: Compartir conmigo los datos

Una vez que tengas todo, compárteme:
1. La URL completa del formulario
2. Los 10 IDs de los campos (entry.XXXXXXX)

Con esos datos actualizaré el código automáticamente.

