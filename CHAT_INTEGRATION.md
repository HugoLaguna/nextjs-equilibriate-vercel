# Integración del Chat con Google Gemini

## Características implementadas

### 1. **API de Google Gemini**
- Cliente configurado con el modelo `gemini-2.0-flash-lite`
- Endpoint: [`/api/chat`](src/app/api/chat/route.ts)
- Usa el prompt de sistema de [`prompts.ts`](src/data/prompts.ts)

### 2. **Validación de mensajes**
- Límite de **450 caracteres** por mensaje
- Contador visual en tiempo real
- Validación tanto en cliente como en servidor
- Colores de advertencia cuando quedan menos de 50 caracteres

### 3. **Gestión de conversaciones**
- Almacenamiento en **localStorage**
- Soporte para **múltiples conversaciones**
- Cada conversación incluye:
  - ID único
  - Título personalizable
  - Mensajes
  - Bloques compactados
  - Prompt de sistema

### 4. **Compactación de mensajes**
- Se activa automáticamente después de **15 mensajes**
- Mantiene siempre el mensaje inicial del asistente
- Conserva los últimos 5 mensajes para contexto reciente
- Los bloques compactados se guardan pero no se muestran
- Límite máximo de **100 mensajes** por conversación

### 5. **Renderizado de Markdown**
- Mensajes del asistente se renderizan como Markdown
- Soporte para:
  - Listas (ordenadas y no ordenadas)
  - Enlaces
  - Negrita/Cursiva
  - Tablas (GitHub Flavored Markdown)
  - Bloques de código

### 6. **Manejo de errores**
- Mensajes de error visibles en UI
- Validación de API key
- Manejo de errores de red
- Estados de carga

## Estructura de archivos

```
src/
├── app/api/chat/route.ts           # API route de Gemini
├── components/chat/ChatPanel.tsx    # Componente principal del chat
├── hooks/useChat.ts                 # Hook personalizado para el chat
├── services/conversationService.ts  # Servicio de gestión de conversaciones
├── lib/messageCompaction.ts         # Lógica de compactación
├── types/chat.ts                    # Tipos TypeScript
└── data/prompts.ts                  # Prompt de sistema
```

## Constantes importantes

```typescript
MAX_MESSAGE_LENGTH = 450      // Límite de caracteres por mensaje
COMPACTION_THRESHOLD = 15     // Mensajes antes de compactar
MAX_MESSAGES = 100           // Límite total de mensajes
```

## Cómo funciona la compactación

1. Cuando hay 15+ mensajes (sin contar el inicial):
   - Se mantiene el primer mensaje (bienvenida del asistente)
   - Se compactan todos los mensajes excepto los últimos 5
   - Los mensajes compactados se guardan en un bloque separado

2. El bloque compactado contiene:
   - Resumen del número de mensajes
   - Los mensajes originales (para historial)
   - Timestamp de compactación

3. Al enviar a la API:
   - Se agrega un mensaje de contexto sobre los bloques compactados
   - Solo los mensajes activos se envían a Gemini

## Variables de entorno requeridas

```env
GEMINI_API_KEY=tu_api_key_aquí
```

## Uso

El chat está completamente integrado en [`ChatPanel.tsx`](src/components/chat/ChatPanel.tsx). Las conversaciones se persisten automáticamente en localStorage y se restauran al recargar la página.

Para crear una nueva conversación en el futuro (UI pendiente):
```typescript
const { createConversation } = useChat();
createConversation("Título de la conversación");
```

## Próximos pasos sugeridos

- [ ] UI para gestionar múltiples conversaciones (lista, crear, eliminar)
- [ ] Búsqueda en conversaciones
- [ ] Exportar conversaciones
- [ ] Compartir conversaciones
- [ ] Mejorar el resumen de bloques compactados con IA
