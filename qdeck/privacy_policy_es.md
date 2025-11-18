# Política de Privacidad

**Última actualización**: 18 de noviembre de 2025

## 1. Introducción

Gracias por usar Qdeck (en adelante, "la Aplicación"). Esta Política de Privacidad explica qué información recopila, utiliza y maneja FRAGMENT LLC (en adelante, "nosotros" o "la Compañía") al proporcionar la Aplicación.

## 2. Información que Recopilamos

### 2.1 Datos de Conjuntos de Preguntas
- Títulos de preguntas
- Texto de preguntas
- Texto de respuestas
- Información de categoría de preguntas
- Marcas de tiempo de creación y actualización de preguntas
- Historial de aprendizaje (banderas completadas, recuentos de revisión, etc.)

### 2.2 Datos de Imágenes
- Imágenes de problemas capturadas por la cámara
- Metadatos de imágenes (tamaño, formato, etc.)
- Datos de imágenes temporales para procesamiento OCR

### 2.3 Datos de Análisis OCR
- Extracción de texto de imágenes utilizando Google Cloud Vision API
- Datos de texto resultantes del análisis OCR
- Registros de comunicación API (utilizados solo para resolución de errores)

### 2.4 Información de Compras
- Historial de compras dentro de la aplicación
- IDs de transacción de compra
- Estado de suscripción (vía RevenueCat)
- Fechas de compra y fechas de vencimiento

### 2.5 Información Técnica
- Información del dispositivo (SO, tipo de dispositivo)
- Información de versión de la aplicación
- Registros de errores e informes de fallos
- Datos de uso anonimizados vía Firebase Analytics

## 3. Propósito del Uso de la Información

Utilizamos la información recopilada para los siguientes propósitos:

### 3.1 Proporcionar Funciones Principales
- Almacenamiento y gestión de conjuntos de preguntas
- Extracción automática de texto vía OCR
- Captura y visualización de imágenes
- Búsqueda y organización de preguntas
- Funcionalidad de salida PDF
- Proporcionar funciones de compra dentro de la aplicación

### 3.2 Mejora del Servicio
- Mejora de las funciones de la aplicación
- Mejora de la usabilidad
- Desarrollo de nuevas funciones
- Mejora de la precisión del análisis OCR (utilizando solo datos anonimizados)

### 3.3 Soporte Técnico
- Resolución de problemas
- Corrección de errores
- Mantenimiento de seguridad
- Optimización del rendimiento

## 4. Compartir y Divulgar Información

### 4.1 Divulgación a Terceros
No proporcionaremos información personal a terceros sin el consentimiento del usuario, excepto en los siguientes casos:
- Cuando la divulgación sea requerida por ley
- Cuando sea necesario para proteger la vida, el cuerpo o la propiedad
- Cuando sea necesario cooperar con agencias gubernamentales nacionales o locales en el desempeño de funciones prescritas por ley

### 4.2 Integración con Servicios Externos
La Aplicación se integra con los siguientes servicios externos:

#### Google Cloud Vision API
- Extracción de texto de imágenes (procesamiento OCR)
- Política de Privacidad: https://policies.google.com/privacy

#### RevenueCat
- Gestión de compras dentro de la aplicación
- Gestión del estado de suscripción
- Política de Privacidad: https://www.revenuecat.com/privacy

#### Firebase Analytics
- Recopilación de datos de uso anonimizados
- Análisis del rendimiento de la aplicación
- Política de Privacidad: https://firebase.google.com/support/privacy

#### Apple App Store / Google Play Store
- Procesamiento de compras dentro de la aplicación
- Gestión de transacciones de compra
- Cumple con la política de privacidad de cada tienda

## 5. Almacenamiento y Gestión de Datos

### 5.1 Ubicación de Almacenamiento
- Almacenamiento en el dispositivo: Datos de conjuntos de preguntas, datos de imágenes, configuraciones de usuario (SharedPreferences, almacenamiento local del dispositivo)
- RevenueCat: Historial de compras, estado de suscripción
- Firebase: Datos de análisis anonimizados
- Procesamiento temporal en la nube: Imágenes de análisis OCR (eliminadas inmediatamente después del procesamiento)

### 5.2 Período de Retención
- Datos de conjuntos de preguntas: Hasta que el usuario los elimine
- Datos de imágenes: Hasta que el usuario los elimine
- Historial de compras: Período requerido por ley
- Datos de caché: Hasta la desinstalación de la aplicación
- Registros de errores: Máximo 90 días
- Imágenes de procesamiento OCR: Eliminadas inmediatamente después del procesamiento

### 5.3 Medidas de Seguridad
- Almacenamiento cifrado de datos en el dispositivo
- Cifrado de comunicaciones vía HTTPS
- Control de acceso basado en el principio de privilegio mínimo
- Auditorías de seguridad regulares

## 6. Derechos del Usuario

### 6.1 Acceso y Modificación de Datos
Los usuarios pueden realizar las siguientes operaciones desde la pantalla de configuración de la aplicación:
- Ver, editar y eliminar datos de conjuntos de preguntas
- Agregar y eliminar imágenes
- Cambiar categorías y estado de aprendizaje
- Ver historial de compras

### 6.2 Eliminación de Datos
- Desinstalar la aplicación eliminará todos los datos en el dispositivo
- Eliminar un conjunto de preguntas individualmente también eliminará los datos de imagen asociados
- La función "Eliminar Todos los Datos" en la configuración permite la eliminación por lotes de todos los datos de conjuntos de preguntas en el dispositivo

### 6.3 Portabilidad de Datos
Los usuarios pueden obtener sus datos a través de la función de salida PDF para conjuntos de preguntas guardados.

## 7. Funciones OCR y Procesamiento de Datos

### 7.1 Procesamiento en la Nube
- El análisis de imágenes OCR se realiza en la nube utilizando Google Cloud Vision API
- Las imágenes para análisis se envían temporalmente a los servidores de Google para el procesamiento de API
- Después del procesamiento, los datos de imagen enviados se eliminan inmediatamente
- Google no utiliza las imágenes enviadas para publicidad u otros propósitos

### 7.2 Mejora de Precisión
- Las estadísticas de resultados de análisis anonimizados pueden utilizarse para mejorar la precisión del OCR
- Incluso en este caso, no se incluye información de identificación personal

## 8. Compras y Suscripciones Dentro de la Aplicación

### 8.1 Gestión de Información de Compras
- Las compras dentro de la aplicación se procesan a través de RevenueCat y los servicios de las tiendas Apple/Google
- Solo retenemos los IDs de transacción de compra y el estado de suscripción
- La información de pago (información de tarjeta de crédito, etc.) no es retenida por nosotros y es gestionada por cada tienda

### 8.2 Uso del Historial de Compras
- El historial de compras se utiliza solo para proporcionar funciones premium y soporte
- No se utiliza para ventas a terceros o propósitos de marketing

## 9. Menores de Edad

La Aplicación no recopila intencionalmente información personal de usuarios menores de 13 años. Si nos enteramos de que se ha proporcionado información personal por alguien menor de 13 años, la eliminaremos de inmediato.

## 10. Cookies y Tecnologías Similares

La Aplicación utiliza las siguientes tecnologías para almacenar configuraciones de usuario y operación de la aplicación:
- SharedPreferences (almacenamiento local)
- Firebase Analytics (datos de análisis anonimizados)

Estas son necesarias para proporcionar la funcionalidad de la aplicación y no se utilizan para rastreo identificable personalmente o propósitos publicitarios.

## 11. Transferencia Internacional de Datos

Los datos del usuario pueden almacenarse o procesarse en los siguientes servidores de servicio:
- Google Cloud (procesamiento OCR)
- RevenueCat (gestión de compras)
- Firebase (datos de análisis)

Estos servidores están ubicados en centros de datos que cumplen con estándares de seguridad apropiados. Puede ocurrir transferencia de datos fuera de Japón, pero se han implementado medidas de protección apropiadas.

## 12. Cambios en la Política de Privacidad

Esta Política de Privacidad puede actualizarse según sea necesario. Los cambios significativos se comunicarán a los usuarios a través de notificaciones dentro de la aplicación o anuncios en el sitio web.

## 13. Contacto

Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, contáctenos en:

**FRAGMENT LLC**
- Sitio web: https://fragment.co.jp

## 14. Ley Aplicable

Esta Política de Privacidad se rige e interpreta de acuerdo con la ley japonesa.

---

**Descargo de responsabilidad**: Esta Política de Privacidad se proporciona como una guía general y no constituye asesoramiento legal. Recomendamos consultar con profesionales legales para la implementación real.
