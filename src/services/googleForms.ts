import { UserData, TestResult } from '../types';
import { K2_CONTACT } from '../config/k2Contact';

// URL del formulario de Google Forms
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdu3AS1cjd3IJgf0dFz6smG83NoDtyGlXMWZJMG6dE88o-GWg/formResponse';

// IDs de los campos del formulario
const FORM_FIELD_IDS = {
  nombre: 'entry.421620701',           // Campo 1: Nombre completo
  empresa: 'entry.440648688',          // Campo 2: Empresa
  cargo: 'entry.376414939',            // Campo 3: Cargo
  pais: 'entry.865462329',             // Campo 4: País
  correo: 'entry.1764670428',          // Campo 5: Correo electrónico
  whatsapp: 'entry.1845723712',        // Campo 6: WhatsApp
  puntajeTotal: 'entry.923143848',     // Campo 7: Puntaje Total
  nivel: 'entry.384679892',            // Campo 8: Nivel
  recomendaciones: 'entry.1236599801', // Campo 9: Recomendaciones
  fechaCompletado: 'entry.1614030703'  // Campo 10: Fecha completado
};

/**
 * Envía los datos del usuario y resultados del test a Google Forms
 */
export const submitToGoogleForms = async (
  userData: UserData,
  testResult: TestResult
): Promise<boolean> => {
  // Validación básica - verificar que la URL esté configurada
  if (!GOOGLE_FORMS_URL || GOOGLE_FORMS_URL.includes('YOUR_FORM_ID')) {
    return false;
  }
  
  try {
    console.log('📤 Enviando datos a Google Forms...', { userData, testResult });
    
    // Formatear recomendaciones
    const recomendacionesTexto = testResult.recommendations.length > 0
      ? testResult.recommendations.join('\n\n')
      : 'No se generaron recomendaciones específicas';
    
    // Preparar los datos como FormData (formato estándar que Google Forms espera)
    const formData = new FormData();
    
    // Datos del usuario
    formData.append(FORM_FIELD_IDS.nombre, userData.nombre || '');
    formData.append(FORM_FIELD_IDS.empresa, userData.empresa || '');
    formData.append(FORM_FIELD_IDS.cargo, userData.cargo || '');
    formData.append(FORM_FIELD_IDS.pais, userData.pais || '');
    formData.append(FORM_FIELD_IDS.correo, userData.correo || '');
    formData.append(FORM_FIELD_IDS.whatsapp, userData.whatsapp?.trim() || '');
    
    // Resultados del test
    formData.append(FORM_FIELD_IDS.puntajeTotal, testResult.totalScore.toString());
    formData.append(FORM_FIELD_IDS.nivel, testResult.levelText || '');
    formData.append(FORM_FIELD_IDS.recomendaciones, recomendacionesTexto);
    formData.append(FORM_FIELD_IDS.fechaCompletado, new Date().toISOString());
    
    // Log de los datos que se envían (para debug)
    console.log('📋 Datos preparados:', {
      nombre: userData.nombre,
      empresa: userData.empresa,
      puntajeTotal: testResult.totalScore,
      nivel: testResult.levelText
    });
    
    // Enviar datos a Google Forms usando iframe oculto para evitar navegación
    console.log('🌐 URL:', GOOGLE_FORMS_URL);
    
    // Crear un iframe oculto
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe_' + Date.now();
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Crear un formulario temporal que se envía al iframe
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORMS_URL;
    form.target = iframe.name;
    form.style.display = 'none';
    
    // Agregar todos los campos al formulario
    Object.entries({
      [FORM_FIELD_IDS.nombre]: userData.nombre || '',
      [FORM_FIELD_IDS.empresa]: userData.empresa || '',
      [FORM_FIELD_IDS.cargo]: userData.cargo || '',
      [FORM_FIELD_IDS.pais]: userData.pais || '',
      [FORM_FIELD_IDS.correo]: userData.correo || '',
      [FORM_FIELD_IDS.whatsapp]: userData.whatsapp?.trim() || '',
      [FORM_FIELD_IDS.puntajeTotal]: testResult.totalScore.toString(),
      [FORM_FIELD_IDS.nivel]: testResult.levelText || '',
      [FORM_FIELD_IDS.recomendaciones]: recomendacionesTexto,
      [FORM_FIELD_IDS.fechaCompletado]: new Date().toISOString()
    }).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    
    // Agregar formulario al DOM, enviarlo y limpiar después de un tiempo
    document.body.appendChild(form);
    form.submit();
    
    // Limpiar después de 2 segundos
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 2000);
    
    console.log('✅ Formulario enviado usando iframe oculto');
    
    return true;
  } catch (error) {
    console.error('Error al enviar datos a Google Forms:', error);
    return false;
  }
};

/**
 * Genera el texto del reporte para incluir en el correo
 */
export const generateReportText = (userData: UserData, testResult: TestResult): string => {
  const recomendacionesTexto = testResult.recommendations.length > 0
    ? testResult.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n\n')
    : 'No se generaron recomendaciones específicas. Tu cadena de suministro muestra un buen nivel de adaptabilidad.';
  
  return `
REPORTE DE AUTO-DIAGNÓSTICO VUCA - CADENA DE SUMINISTRO

Datos del participante:
- Nombre: ${userData.nombre}
- Empresa: ${userData.empresa}
- Cargo: ${userData.cargo}
- País: ${userData.pais}
- Correo: ${userData.correo}
${userData.whatsapp ? `- WhatsApp: ${userData.whatsapp}` : ''}

RESULTADOS:
- Puntaje Total: ${testResult.totalScore}%
- Nivel: ${testResult.levelText}
- Interpretación: ${testResult.interpretation}

RECOMENDACIONES:
${recomendacionesTexto}

DATOS DE CONTACTO K2:
- Sitio web: ${K2_CONTACT.website}
- Correo: ${K2_CONTACT.email}
${K2_CONTACT.whatsapp ? `- WhatsApp: ${K2_CONTACT.whatsapp}` : ''}
- Programas de formación: ${K2_CONTACT.trainingProgramsUrl}

Fecha de completado: ${new Date().toLocaleDateString('es-ES', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
  `.trim();
};

