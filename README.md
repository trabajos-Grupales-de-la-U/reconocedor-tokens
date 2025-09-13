# Reconocedor de Tokens

Una aplicación web para analizar y reconocer tokens en pseudocódigo de PSeInt. Permite subir archivos de texto (PDF, DOCX, TXT) y realiza un análisis léxico para identificar y contar diferentes tipos de tokens.

## 🚀 Características

- **Análisis de múltiples formatos**: Soporta archivos PDF, DOCX y TXT
- **Reconocimiento de tokens**: Identifica palabras reservadas, operadores, delimitadores y variables
- **Interfaz intuitiva**: Diseño moderno con TailwindCSS
- **Tecnología moderna**: Desarrollado con React, TypeScript y Vite

## 📋 Tokens Reconocidos

### Palabras Reservadas
Incluye todas las palabras clave de PSeInt en español:
- Estructuras de control: `Si`, `Entonces`, `Sino`, `Mientras`, `Para`, etc.
- Tipos de datos: `Entero`, `Real`, `Cadena`, `Logico`, etc.
- Funciones: `Funcion`, `Retornar`, `MostrarMensaje`, etc.

### Operadores
- Aritméticos: `+`, `-`, `*`, `/`, `%`
- Relacionales: `=`, `==`, `!=`, `<`, `>`, `<=`, `>=`
- Lógicos: `&&`, `||`, `!`
- Incremento: `++`, `--`

### Delimitadores
- Paréntesis: `(`, `)`
- Llaves: `{`, `}`
- Corchetes: `[`, `]`
- Punto y coma: `;`
- Coma: `,`
- Punto: `.`

### Variables
Identificadores que no son palabras reservadas, siguiendo el patrón: `[a-zA-Z_][a-zA-Z0-9_]*`

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **PDF Processing**: pdfjs-dist
- **Word Processing**: mammoth
- **Linting**: ESLint con configuración TypeScript

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/reconocedor-tokens.git
cd reconocedor-tokens
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── Components/
│   ├── Home.tsx              # Componente principal
│   ├── FormFileInput.tsx     # Formulario de subida de archivos
│   └── KeyWords.json         # Definición de tokens
├── Services/
│   ├── parser.tsx            # Servicio de parsing de archivos
│   ├── Analizer.tsx          # Lógica de análisis de tokens
│   └── Report.tsx            # Servicio de reportes (en desarrollo)
└── App.tsx                   # Aplicación principal
```

## 🔧 Configuración de ESLint

El proyecto incluye configuración avanzada de ESLint para TypeScript y React. Para habilitar reglas type-aware:

```js
// eslint.config.js
export default tseslint.config([
  // Configuración existente...
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

-ANDERSSON MISHAEL LÓPEZ SANÍC
-AXEL ALEJANDRO GARCÍA BARRIENTOS
-BREYNER ORLANDO LARIOS SERECH
-JORGE ARMANDO MAGUEY TAJÍN
-MAYNOR DAVID SEMEYÁ CURRUCHICHE
-SAMUEL ESTUARDO GONZÁLEZ CHITAMUL

## 🙏 Agradecimientos

- PSeInt por proporcionar la base de pseudocódigo en español
- Las bibliotecas de código abierto utilizadas en este proyecto
