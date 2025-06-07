let figmaTokens = {};
try {
  figmaTokens = require('./src/theme/figma-tokens.json');
} catch (e) {
  // Fallback: file may not exist yet
}

module.exports = {
  theme: {
    extend: {
      colors: {
        // Example: map Figma color tokens to Tailwind
        ...(figmaTokens.colors || {}),
      },
    },
  },
}; 