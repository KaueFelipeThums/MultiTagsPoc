# MultiTagsPoc - Guia de Build por Integradora

## 📋 Visão Geral

Este projeto utiliza um sistema automático de **tags para gerar builds APK específicos para cada integradora**. O GitHub Actions detecta a tag, extrai a integradora e versão, configura as variáveis de ambiente e executa o build automaticamente.

## 🏷️ Padrão de Tags

As tags devem seguir o padrão:

```
{integradora}-v{versão}
```

### Exemplos Válidos

- `rede-v1.2.3`
- `stone-v1.0.1`
- `getnet-v0.2.1`
- `rede-v2.0.0`

### Integradoras Suportadas

- `rede`
- `stone`
- `getnet`
- *(adicione outras conforme necessário)*

## 🚀 Como Usar

### Criar uma nova tag e fazer push

```bash
# Exemplo: criar tag para REDE v1.2.3
git tag rede-v1.2.3
git push origin rede-v1.2.3

# Exemplo: criar tag para STONE v1.0.1
git tag stone-v1.0.1
git push origin stone-v1.0.1

# Exemplo: criar tag para GETNET v0.2.1
git tag getnet-v0.2.1
git push origin getnet-v0.2.1
```

### O que acontece automaticamente

1. ✅ GitHub Actions detecta o push da tag
2. ✅ Extrai a integradora e versão da tag
3. ✅ Cria arquivo `.env` com `ADMINISTRATOR={integradora}`
4. ✅ Atualiza `package.json` com a versão
5. ✅ Atualiza `build.gradle` com a versão
6. ✅ Executa o build do APK
7. ✅ Publica o APK como Release no GitHub
8. ✅ Gera artifact por 30 dias

### Baixar o APK

Acesse a seção **Releases** no repositório do GitHub e baixe o APK da integradora desejada.

---

## 📁 Estrutura de Arquivos

```
.
├── .env.example              # Template das variáveis de ambiente
├── .github/
│   └── workflows/
│       └── build-apk.yml     # Workflow do GitHub Actions
├── android/
│   └── app/
│       └── build.gradle      # Configuração do build Gradle
├── package.json              # Versão do app
└── README.md                 # Este arquivo
```

## 🔧 Variáveis de Ambiente

### .env (Criado automaticamente pela pipeline)

```bash
ADMINISTRATOR=REDE              # Integradora selecionada
APP_VERSION=1.2.3               # Versão do app
```

A pipeline cria este arquivo automaticamente com base na tag utilizada.

### No React Native

Para acessar a integradora no código:

```typescript
// No App.tsx ou em qualquer componente
import { BuildConfig } from 'react-native';

const integradora = BuildConfig.ADMINISTRATOR;
console.log('Integradora:', integradora); // "REDE", "STONE", etc
```

---

## 🔐 Segurança

### Keystore

O build atual usa `debug.keystore` para assinar. Para produção:

1. Gere um keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

2. Atualize `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('path/to/my-release-key.keystore')
        storePassword '...'
        keyAlias '...'
        keyPassword '...'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

---

## 📊 Fluxo de Build

```
┌─────────────────────────────────────┐
│  git push origin {integradora}-v...  │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  GitHub Actions detecta tag         │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Extrai integradora e versão        │
│  Ex: rede-v1.2.3 → REDE, 1.2.3      │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Cria .env com ADMINISTRATOR        │
│  Atualiza package.json              │
│  Atualiza build.gradle              │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Build do APK                       │
│  gradlew assembleRelease            │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Renomeia APK                       │
│  app-{INTEGRADORA}-{VERSAO}.apk    │
└──────────────┬──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Publica como Release no GitHub     │
│  Com APK para download              │
└─────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Build falha no GitHub Actions

1. Verifique o formato da tag: `integradora-vX.Y.Z`
2. Verifique se `android/app/build.gradle` é válido
3. Verifique os logs da Action no GitHub (aba Actions → Seu workflow)

### APK não aparece nas Releases

1. Verifique se a tag foi feita corretamente
2. Verifique se o build foi bem-sucedido nos logs da Action
3. Veja a seção "Releases" do repositório

## 📚 Próximas Etapas

- Configurar keystore para produção
- Configurar upload para Google Play Store (Google Play Console)
- Configurar múltiplas arquiteturas (arm64-v8a, armeabi-v7a, x86_64)
- Adicionar notificações em Slack/Discord ao fim do build
