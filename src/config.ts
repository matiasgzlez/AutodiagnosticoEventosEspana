import { TestConfig } from './types';

export const testConfig: TestConfig = {
  questions: [
    {
      id: 1,
      text: "Su forma de gestionar la cadena de suministro mitiga el efecto látigo consistentemente, evitando que la variabilidad entre a sus operaciones causando reprocesos y cambios frecuentes en su planeación?",
      recommendation: "Debe implementar mecanismos de amortiguación dinámica de la variabilidad en todas sus formas que eviten la propagación del efecto látigo. Se recomienda revisar el concepto de desacoplamiento o desacople que propone Demand Driven MRP."
    },
    {
      id: 2,
      text: "Su empresa posee un nivel de servicio de clase mundial >98% que además cumple con las expectativas de todos los stakeholders?",
      recommendation: "Probablemente en su empresa el centro y propósito del modelo de gestión de su cadena de suministro no es proteger y promover la velocidad de flujo de materiales e información relevantes, sino más bien la eficiencia basada en el costo. El problema es que hay decisiones basadas solo en costos que hacen daño al flujo. Le recomendamos revisar el concepto de eficiencia basada en el flujo, para que ambos, flujo y costo, logren resultados de clase mundial."
    },
    {
      id: 3,
      text: "Su empresa mantiene un nivel de inventario muy balanceado para cada producto, sin excesos de inventario por encima de la cobertura ideal para su industria que causan sobrecostos por almacenamiento adicional, costos de capital, aseguramiento, obsolescencia, averías y custodia?",
      recommendation: "Es probable es su empresa tenga políticas de pedidos o lotes mínimos (MOQ) demasiado grandes en algunos productos, que generan excesos porque cada vez que produce un lote está produciendo, comprando o distribuyendo mas de 6 meses de venta o consumo. Le recomendamos revisar los lotes o pedidos mínimos para reducirlos, enfocando su análisis en aquellos cuyo tamaño signifique más de 6 meses de venta o consumo o hacer un análisis de pareto para encontrar el 20% de los materiales / productos que causan más del 80% del exceso de inventario. No tiene que reducir el lote a 1 unidad o algo descabellado; comience por reducir el MOQ a la mitad o hasta que una restricción técnica se lo permita y no una política indiscriminada de 'entre más grande, es mejor'."
    },
    {
      id: 4,
      text: "Su proceso de planificación de ventas y operaciones (S&OP) y/o de planificación integrada del negocio (IBP) identifica velozmente cambios relevantes para su negocio en demanda, suministro y variables externas de cambios en la competencia, socio-economicos, regulatorios, políticos y otros, y adapta rápidamente su cadena de suministros a estos cambios para absorber su impacto, aprovechando oportunidades y mitigando riesgos?",
      recommendation: "El nivel de madurez de su proceso de S&OP / IBP aún es bajo o ha implementado un proceso demasiado rígido para adaptarse a los cambios relevantes que ocurren en el horizonte operacional. Debe tener en cuenta la volatilidad y la complejidad en los negocios llegó para quedarse y que según un estudio publicado en Harcard Business Review (la Biología de la Sobrevivencia Corporativa) las empresas están muriendo 6 veces más rapido que antes por la falta de adaptación a la crecimiente complejidad de su entorno. Le recomendamos explorar modelos de S&OP adaptativa para lograr esa adaptación."
    },
    {
      id: 5,
      text: "Los proveedores de su empresa están completamente alineados con su cadena de suministro para evitar causar retrasos / daños por la incertibumbre y volatilidad o mitigar sus daños, y dicha modelo incluye prácticas de colaboración entre las partes?",
      recommendation: "Es necesario emprender iniciativas que logren la alineación de sus proveedores y evolucionar los métodos estpaticos que posee con los proveedores que no logran visibilizar la variabilidad ni adaptarse a la incertidumbre en el suministro. Para ello, mida y visibilice a los proveedores que más causan daño al flujo en su cadena de suministro y desarrolle con ellos prácticas colaborativas centradas en compartir la información relevante para que ambas partes alineen sus decisiones e identifiquen prematuramente situaciones de variabilidad a la contraparte, e implemente un modelo dinámico de stock que pueda mitigar la mayor parte de la variabilidad en el suministro e identifique y adapte el abastecimiento a los cambios relavantes que se originan en los proveedores."
    },
    {
      id: 6,
      text: "Su empresa posee prácticas colaborativas con sus clientes que funcionan, compartiendo información relevante entre las partes para dar visibiidad a su toma de decisiones gerenciales, mitigando y anticipando el efecto de los cambios y la incertibumbre en la cadena de suministro?",
      recommendation: "No conocer el comportamiento de la demanda de los clientes, pensando que sus pedidos u órdenes son reflejo de la demanda de los clientes de nuestros clientes, es una idea que no solo no mitiga el efecto látigo, sino que lo amplifica. Le recomendamos comenzar a fomentar conversaciones reales con los clientes centradas en implementar prácticas colaborativas que comparten, con transparencia y frecuencia, información relevante del suministro de su parte y de la demanda por parte de los clientes."
    },
    {
      id: 7,
      text: "La gestión de la capacidad de sus recursos y talentos en los procesos de compras, manufactura y/o distribucion está sincronizada con la demanda cambiante de sus clientes, sin producir excesos de inventario que no se facturan en el horizonte operacional de un activo corriente (dias/semanas) y mejorando de manera ficticia la productividad y el costo, pero deteriorando el ROI, flujo de caja y en general la rentabilidad de la empresa?",
      recommendation: "Su concepto de productividad y eficiencia está anclado al pasado: a pesar que el costo unitario mejore con un mayor volumen, esa mejora en los márgenes será un espejismo si ese volumen adicional que reduce el costo se queda almacenado demasiado tiempo en su centro de distribución o bodega gastando recursos. Muchas bodegas están llenas de excesos de inventario que se compraron o manufacturaron con mucha productividad y eficiencia, deteriorando la rentabilidad y competitividad de su organizaicón. Le recomendamos explorar los nuevos conceptos de productividad y eficiencia basada en el flujo, y no en el costo. Para sincronizar la capacidad y los talentos con la demanda para no producir desperdicios, los indicadores de productividad y eficiencia deben evolucionar y no deberian mejorar por el volumen de material comprado o producido que no es relevante para facturar en el horizonte operacional."
    },
    {
      id: 8,
      text: "Sus políticas de inventario están conectadas con la naturaleza de flujo de cada material (lead time, ciclos o frecuencias, restricciones de lote o pedido, variabilidad esperada), evitando colocar una política indiscriminada de N días para una familia de productos que puede ser muy grande para algunos productos y muy pequeña para otros y esta política es dinámica para adaptarse a los cambios frecuentes y la incertidumbre que su negocio enfrenta?",
      recommendation: "Es muy probable que sus políticas se hayan quedado obsoletas hace algún tiempo si enfrenta un entorno de negocios con cambios constantes con una política de inventarios estática o que no se reconfigura / recalcula con el mismo dinamismo que ocurren los cambios. Además está política debe ser muy grande para algunos productos cuyo ciclo total de reabastecimiento (frecuencia + lead time) es corto y es muy pequeña para aquellos materiales que posean un ciclo total de reabastecimiento más largo. Le sugerimos explorar modelos de inventario que posean mecanismos de ajustes dinámicos para portafolios complejos de miles de productos y  de combinaciones material-centro."
    },
    {
      id: 9,
      text: "El diseño de su red de valor / cadena de suministro define posiciones de stock en donde es más efectivo luchar contra la variabilidad debido a la agregación de una demanda y suministro volátil, en contraposición de posicionar la mayoria de su inventario en ubicaciones más cercanas al cliente donde la demanda es más volatil?",
      recommendation: "Enfrentar una demanda volátil en el punto de la cadena de suministro donde hay mayor variabilidad en la receta segura para perder la batalla contra ella. 'Murphy' es mucho más fuerte allí y no es muy inteligente pelear esa batalla en su terreno. Si además de todo esas posiciones de stock no son dinámicas entonces no podremos adaptarlas a los cambios que ocurren en la demanda y rápidamente algunas de esas posiciones generarán excesos de inventario, y otras generarán faltantes / quiebres. Finalmente, en algunas industrias hay un agravante: por el sustento de leyes como el teorema del límite central y la teoría de la agregación sabemos que las desviaciones de una variable en el punto mas cercano al cliente (como la demanda) que es atendida desde un punto común (un hub en manufactura o un centro de distribución principal), se compensan en el punto común que las abastece, pero eso no es posible si todo pedido y orden que pasa por sese hub o centro de distribución ya tiene un destino específico cuando entra a dicho nodo (si el inventario ya está asignado a una orden desde antes, entonces dicha orden solo está pasando por el hub o centro de distribución y el efecto de compensación o agregación descrito, no ocurre!).  Le recomendamos estudiar los factores de posicionamiento estratégico que propone Demand Driven MRP / DRP y dedicar tiempo a explorar como aplicarlos para rediseñar su red de valor."
    },
    {
      id: 10,
      text: "Considera que sus equipos de trabajo / talento humano están bien formados y entienden el impacto de la variabilidad y la incertidumbre en su cadena de suministro y como gestionarlas, y tienen la capacidad de orquestar / sincronizar los procesos de su cadena a través de una comunicación efectiva y transversal entre áreas para tomar decisiones consensuadas / colaboradas basadas en información relevante, y por lo tanto, sus reuniones de conciliación o consenso no son una batalla entre áreas que reflejan una mentalidad de silos?",
      recommendation: "Tratar de orquestar un sistema complejo (como una cadena de suministro o una empresa) dividiéndolo en partes y tratando de optimizar cada parte por separado, es una práctica obsoleta porque ignora las relaciones de dependencia entre esas partes en un mundo cada vez más interconectado y complejo. Le recomendamos educar a sus equipo de trabajo / talento humano en enfoques de pensamiento sistémico y liderazgo adaptativo ya que la orquestación de cadenas de suministro debe romper los silos de la organización para gobiernen las prácticas holísticas que benefician a la empresa como un todo sobre aquellos resultados que son solo locales."
    }
  ],
  levels: {
    low: { 
      min: 0, 
      max: 70, 
      text: 'Necesita transformación', 
      interpretation: 'Tu cadena de suministro muestra vulnerabilidades significativas frente a los desafíos VUCA. Es crucial implementar cambios profundos para mejorar la resiliencia y adaptabilidad.' 
    },
    medium: { 
      min: 71, 
      max: 85, 
      text: 'Mejora táctica', 
      interpretation: 'Tu cadena de suministro tiene una base sólida, pero aún hay oportunidades para optimizar procesos y fortalecer la respuesta ante la incertidumbre. Considera mejoras tácticas.' 
    },
    high: { 
      min: 86, 
      max: 100, 
      text: 'Madurez avanzada', 
      interpretation: 'Tu cadena de suministro es altamente adaptable y resiliente. Estás bien posicionado para navegar en entornos VUCA, pero siempre hay espacio para la innovación continua.' 
    },
  }
};