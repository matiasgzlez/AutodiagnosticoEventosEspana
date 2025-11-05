/**
 * Script de Google Apps Script para enviar automáticamente
 * el informe del autodiagnóstico VUCA por email al usuario
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Ve a tu Google Form: https://docs.google.com/forms/d/e/1FAIpQLSe_dZQb2ILKkSGm5uMEhLgH0REJ13czP9NuGr48MsmOGpwJVw/edit
 * 2. Haz clic en el menú de tres puntos (⋮) → "Scripts del editor de formularios"
 * 3. Pega este código completo en el editor de scripts
 * 4. Guarda el proyecto con un nombre (ej: "Envío de informes VUCA")
 * 5. Configura el trigger como se explica al final de este archivo
 */

/**
 * Función que se ejecuta automáticamente cuando se envía una nueva respuesta al formulario
 */
function onFormSubmit(e) {
  try {
    // Obtener los valores del formulario
    const formResponse = e.response;
    const itemResponses = formResponse.getItemResponses();
    
    // Variables para almacenar los valores
    let nombre = '';
    let empresa = '';
    let cargo = '';
    let pais = '';
    let correo = '';
    let whatsapp = '';
    let puntajeTotal = '';
    let nivel = '';
    let recomendaciones = '';
    let fechaCompletado = '';
    
    // Log para debug: ver todos los campos recibidos
    Logger.log(`📋 Total de campos recibidos: ${itemResponses.length}`);
    
    // Orden esperado de los campos (según el formulario):
    // 0: Nombre Completo
    // 1: Empresa
    // 2: Cargo
    // 3: País
    // 4: Correo Electrónico
    // 5: WhatsApp (Opcional)
    // 6: Puntaje Total
    // 7: Nivel
    // 8: Recomendaciones
    // 9: Fecha Completado
    
    // Método 1: Leer por orden (más confiable)
    if (itemResponses.length >= 10) {
      nombre = itemResponses[0].getResponse() || '';
      empresa = itemResponses[1].getResponse() || '';
      cargo = itemResponses[2].getResponse() || '';
      pais = itemResponses[3].getResponse() || '';
      correo = itemResponses[4].getResponse() || '';
      whatsapp = itemResponses[5].getResponse() || '';
      puntajeTotal = itemResponses[6].getResponse() || '';
      nivel = itemResponses[7].getResponse() || '';
      recomendaciones = itemResponses[8].getResponse() || '';
      fechaCompletado = itemResponses[9].getResponse() || '';
    } else {
      // Método 2: Leer por título (respaldo)
      Logger.log('⚠️ Menos de 10 campos, usando identificación por título');
      for (let i = 0; i < itemResponses.length; i++) {
        const itemResponse = itemResponses[i];
        const title = itemResponse.getItem().getTitle().toLowerCase().trim();
        const response = itemResponse.getResponse();
        
        // Log para debug
        Logger.log(`  Campo ${i}: "${itemResponse.getItem().getTitle()}" = "${response}"`);
        
        // Identificar cada campo por su título (case-insensitive)
        if (title === 'nombre completo' || title.includes('nombre completo')) {
          nombre = response;
        } else if (title === 'empresa' || title.includes('empresa')) {
          empresa = response;
        } else if (title === 'cargo' || title.includes('cargo')) {
          cargo = response;
        } else if (title === 'país' || title === 'pais' || title.includes('país')) {
          pais = response;
        } else if (title === 'correo electrónico' || title.includes('correo electrónico') || title.includes('correo') || title.includes('email')) {
          correo = response;
        } else if (title.includes('whatsapp')) {
          whatsapp = response || '';
        } else if (title === 'puntaje total' || title.includes('puntaje total') || title.includes('puntaje')) {
          puntajeTotal = response;
        } else if (title === 'nivel' || title.includes('nivel')) {
          nivel = response;
        } else if (title === 'recomendaciones' || title.includes('recomendaciones')) {
          recomendaciones = response;
        } else if (title === 'fecha completado' || title.includes('fecha completado') || title.includes('fecha')) {
          fechaCompletado = response;
        }
      }
    }
    
    // Log adicional: mostrar todos los campos recibidos
    Logger.log('📋 Todos los campos recibidos:');
    for (let i = 0; i < itemResponses.length; i++) {
      Logger.log(`  [${i}] "${itemResponses[i].getItem().getTitle()}" = "${itemResponses[i].getResponse()}"`);
    }
    
    // Log para debug
    Logger.log('📊 Datos extraídos del formulario:');
    Logger.log(`  Nombre: ${nombre}`);
    Logger.log(`  Empresa: ${empresa}`);
    Logger.log(`  Cargo: ${cargo}`);
    Logger.log(`  País: ${pais}`);
    Logger.log(`  Correo: ${correo}`);
    Logger.log(`  WhatsApp: ${whatsapp}`);
    Logger.log(`  Puntaje: ${puntajeTotal}`);
    Logger.log(`  Nivel: ${nivel}`);
    Logger.log(`  Fecha: ${fechaCompletado}`);
    
    // Validar que tengamos el correo del usuario
    if (!correo || correo.trim() === '') {
      Logger.log('⚠️ No se encontró correo electrónico. No se enviará el email.');
      return;
    }
    
    // Validar que tengamos el nombre
    if (!nombre || nombre.trim() === '') {
      nombre = 'Estimado/a profesional';
    }
    
    // Generar el contenido del email HTML
    Logger.log('📝 Generando contenido del email HTML...');
    const emailBody = generarCuerpoEmailHTML(nombre, empresa, cargo, pais, correo, whatsapp, puntajeTotal, nivel, recomendaciones, fechaCompletado);
    Logger.log(`✅ Contenido HTML generado: ${emailBody.length} caracteres`);
    
    // Verificar que el HTML contiene el link correcto
    if (emailBody.includes('bit.ly') || emailBody.includes('docs.google.com') || emailBody.includes('eventos.k2sol.co')) {
      Logger.log('✅ El HTML contiene el link del formulario/evento');
      // Extraer el link exacto del HTML para verificar
      const linkMatch = emailBody.match(/href=['"]([^'"]*(?:bit\.ly|docs\.google\.com|eventos\.k2sol\.co)[^'"]*)['"]/);
      if (linkMatch) {
        Logger.log(`🔗 Link encontrado en HTML: ${linkMatch[1]}`);
      }
    } else {
      Logger.log('⚠️ ADVERTENCIA: El HTML NO contiene el link esperado');
    }
    
    // Configurar el asunto del email
    const subject = `Reporte de Auto-diagnóstico VUCA - ${nombre}`;
    Logger.log(`📧 Preparando envío de email a: ${correo}`);
    Logger.log(`📧 Asunto: ${subject}`);
    
    // Enviar el email usando MailApp
    try {
      MailApp.sendEmail({
        to: correo,
        subject: subject,
        htmlBody: emailBody,
        name: 'K2 Solutions - Auto-diagnóstico VUCA'
      });
      Logger.log(`✅ Email enviado exitosamente a: ${correo}`);
    } catch (emailError) {
      Logger.log(`❌ Error al enviar email: ${emailError.toString()}`);
      Logger.log(`❌ Mensaje: ${emailError.message}`);
      Logger.log(`❌ Stack: ${emailError.stack}`);
      throw emailError; // Relanzar el error
    }
    
  } catch (error) {
    Logger.log(`❌ Error al procesar el formulario: ${error.toString()}`);
    Logger.log(`❌ Mensaje: ${error.message}`);
    Logger.log(`Stack trace: ${error.stack}`);
  }
}

/**
 * Genera el contenido HTML del email con el informe completo
 */
function generarCuerpoEmailHTML(nombre, empresa, cargo, pais, correo, whatsapp, puntajeTotal, nivel, recomendaciones, fechaCompletado) {
  // URL del evento - definida como constante para evitar problemas
  // Usamos encodeURI para asegurar que el URL esté correctamente codificado
  const urlEvento = 'https://eventos.k2sol.co/evento2';
  
  // Determinar el color según el nivel
  let nivelColor = '#dc2626'; // Rojo por defecto (Necesita transformación)
  let nivelBg = '#fee2e2';
  
  if (nivel.includes('Madurez avanzada')) {
    nivelColor = '#16a34a'; // Verde
    nivelBg = '#dcfce7';
  } else if (nivel.includes('Mejora táctica')) {
    nivelColor = '#ea580c'; // Naranja
    nivelBg = '#ffedd5';
  }
  
  // Formatear recomendaciones (si vienen separadas por saltos de línea)
  let recomendacionesHTML = '';
  if (recomendaciones && recomendaciones.trim() !== '' && recomendaciones !== 'No se generaron recomendaciones específicas') {
    const recsArray = recomendaciones.split('\n\n').filter(r => r.trim() !== '');
    if (recsArray.length > 0) {
      recomendacionesHTML = '<ul style="list-style: none; padding: 0; margin: 20px 0;">';
      recsArray.forEach((rec, index) => {
        recomendacionesHTML += `
          <li style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
            <strong style="color: #ea580c;">Recomendación ${index + 1}:</strong>
            <p style="margin: 8px 0 0 0; color: #374151; line-height: 1.6;">${rec.trim()}</p>
          </li>
        `;
      });
      recomendacionesHTML += '</ul>';
    }
  } else {
    recomendacionesHTML = `
      <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 20px; border-radius: 4px; text-align: center;">
        <p style="margin: 0; color: #065f46; font-weight: 600;">¡Excelente! No necesitas recomendaciones específicas.</p>
        <p style="margin: 10px 0 0 0; color: #047857;">Tu cadena de suministro muestra un buen nivel de adaptabilidad.</p>
      </div>
    `;
  }
  
  // Formatear fecha
  let fechaFormateada = fechaCompletado;
  if (fechaCompletado) {
    try {
      const fecha = new Date(fechaCompletado);
      fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      // Si hay error, usar la fecha tal cual
    }
  }
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  
  <!-- Contenedor principal -->
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <!-- Contenido del email -->
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header con gradiente naranja -->
          <tr>
            <td style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Reporte de Auto-diagnóstico VUCA
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Cadena de Suministro
              </p>
            </td>
          </tr>
          
          <!-- Saludo -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hola <strong>${nombre}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Gracias por completar el auto-diagnóstico VUCA. A continuación encontrarás tu informe completo con recomendaciones personalizadas para fortalecer tu cadena de suministro.
              </p>
            </td>
          </tr>
          
          <!-- Información del participante -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #111827; font-size: 20px; font-weight: 600;">
                  Datos del Participante
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;"><strong>Nombre:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Empresa:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${empresa || 'No especificada'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Cargo:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${cargo || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>País:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${pais || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Correo:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${correo}</td>
                  </tr>
                  ${whatsapp ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>WhatsApp:</strong></td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px;">${whatsapp}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Resultados -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="background-color: #ffffff; border: 2px solid ${nivelColor}; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
                <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: 600;">
                  Resultados del Auto-diagnóstico
                </h2>
                
                <div style="margin-bottom: 20px;">
                  <div style="display: inline-block; background-color: ${nivelBg}; border: 2px solid ${nivelColor}; border-radius: 50px; padding: 12px 30px;">
                    <span style="font-size: 48px; font-weight: bold; color: ${nivelColor};">${puntajeTotal}%</span>
                  </div>
                </div>
                
                <div style="margin-top: 20px;">
                  <div style="display: inline-block; background-color: ${nivelBg}; border: 2px solid ${nivelColor}; border-radius: 50px; padding: 10px 25px;">
                    <span style="font-size: 18px; font-weight: 600; color: ${nivelColor};">${nivel || 'Nivel no especificado'}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Recomendaciones -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: 600;">
                  Recomendaciones Personalizadas
                </h2>
                ${recomendacionesHTML}
              </div>
            </td>
          </tr>
          
          <!-- CTA Brunch-Shop -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); border-radius: 12px; padding: 30px; text-align: center;">
                <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                  TE INVITAMOS A UN &quot;BRUNCH-SHOP&quot; SIN COSTO
                </h3>
                <p style="margin: 0 0 25px 0; color: #ffffff; font-size: 16px; line-height: 1.6; opacity: 0.95;">
                  Basado en las recomendaciones de tu auto-diagnóstico, te invitamos a aplicar a un exclusivo workshop dónde podrás ver como aplicar estos novedosos y poderosos conceptos y su impacto potencial usando un poderoso simulador, y compartir con otros ejecutivos en medio de un delicioso brunch. Aplica y te diremos si fuiste seleccionado para uno de los 20 exclusivos cupos sin costo del evento:
                </p>
                <a href='http://bit.ly/3JCt7t9' style="display: inline-block; background-color: #ffffff; color: #ea580c; text-decoration: none; font-weight: bold; padding: 15px 40px; border-radius: 8px; font-size: 16px; transition: all 0.3s;">
                  QUIERO ASISTIR
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Información de contacto K2 -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px;">
                <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 600; text-align: center;">
                  Contáctanos
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; text-align: center;">
                      <a href="https://k2sol.co" style="color: #ea580c; text-decoration: none; font-weight: 600;">🌐 Sitio web: k2sol.co</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; text-align: center;">
                      <a href="mailto:info@k2sol.co" style="color: #ea580c; text-decoration: none; font-weight: 600;">✉️ Correo: info@k2sol.co</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Fecha de completado: ${fechaFormateada || 'No especificada'}
              </p>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 11px;">
                Herramienta de evaluación desarrollada para profesionales de cadena de suministro<br>
                © ${new Date().getFullYear()} K2 Solutions
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}

/**
 * FUNCIÓN DE PRUEBA - Ejecutar esta función manualmente para autorizar permisos
 * 
 * INSTRUCCIONES PARA AUTORIZAR PERMISOS:
 * 1. En el editor de scripts, selecciona la función "probarYAutorizar" del menú desplegable
 * 2. Haz clic en el botón de ejecutar (▶️)
 * 3. Google te pedirá autorización - haz clic en "Revisar permisos"
 * 4. Selecciona tu cuenta de Google
 * 5. Haz clic en "Permitir" o "Avanzado" → "Ir a [nombre del proyecto] (no seguro)" → "Permitir"
 * 6. Esto autorizará al script para enviar emails
 * 
 * IMPORTANTE: 
 * - Cambia el email de prueba por tu correo antes de ejecutar
 * - Ejecuta esta función una vez para autorizar los permisos antes de usar el formulario
 */
function probarYAutorizar() {
  try {
    Logger.log('🔐 Probando autorización de MailApp...');
    
    // ⚠️ CAMBIA ESTE EMAIL POR TU CORREO
    const emailPrueba = 'matias03gonzalez@gmail.com'; // Cambia esto por tu email
    
    // Intentar enviar un email de prueba (esto forzará la autorización)
    MailApp.sendEmail({
      to: emailPrueba,
      subject: '[PRUEBA] Autorización de Script VUCA',
      htmlBody: '<p>Si recibes este email, los permisos están correctamente configurados.</p>',
      name: 'K2 Solutions - Auto-diagnóstico VUCA'
    });
    
    Logger.log('✅ Email de prueba enviado exitosamente. Los permisos están configurados correctamente.');
    Logger.log(`📧 Revisa tu bandeja de entrada (${emailPrueba}) para confirmar que recibiste el email.`);
    
  } catch (error) {
    Logger.log(`❌ Error: ${error.toString()}`);
    if (error.toString().includes('permission')) {
      Logger.log('🔐 Error de permisos detectado.');
      Logger.log('');
      Logger.log('📋 INSTRUCCIONES PARA AUTORIZAR MANUALMENTE:');
      Logger.log('1. Ve a: https://script.google.com/home/usersettings');
      Logger.log('2. Busca "Permisos de acceso" o "App Script permissions"');
      Logger.log('3. Haz clic en "Permitir acceso" o "Authorize"');
      Logger.log('4. O ejecuta la función de nuevo y busca el enlace de autorización en los mensajes de error');
    } else {
      Logger.log('💡 Revisa el error y asegúrate de haber cambiado el email de prueba.');
    }
  }
}

/**
 * CONFIGURACIÓN DEL TRIGGER (VER INSTRUCCIONES DETALLADAS EN EL ARCHIVO DE GUÍA)
 * 
 * 1. En el editor de scripts, haz clic en el icono del reloj ⏰ (Triggers)
 * 2. Haz clic en "+ Agregar trigger" en la parte inferior
 * 3. Configura:
 *    - Función a ejecutar: onFormSubmit
 *    - Origen del evento: Desde formulario
 *    - Tipo de evento: Al enviar el formulario
 * 4. Guarda el trigger
 * 
 * IMPORTANTE: Antes de usar el formulario, ejecuta la función "probarYAutorizar" para autorizar los permisos
 */
