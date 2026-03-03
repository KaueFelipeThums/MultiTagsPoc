# 🚀 Quick Start - Sistema de Tags e Build Automático

## O que é?

Sistema automático para gerar APKs específicos por integradora:
- 📱 REDE, STONE, GETNET
- 🏷️ Uma tag por versão (`rede-v1.2.3`, `stone-v1.0.1`)
- ⚙️ Build automático na pipeline quando tag é feita push
- 📥 APK disponível para download nas Releases

## Como Usar (Super Simples!)

### 1️⃣ Criar uma Tag

```bash
git tag rede-v1.2.3
git push origin rede-v1.2.3
```

### 2️⃣ Pronto!

GitHub Actions automaticamente:
- ✅ Detecta a tag
- ✅ Extrai a integradora (rede) e versão (1.2.3)
- ✅ Cria `.env` com `ADMINISTRATOR=REDE`
- ✅ Faz o build do APK
- ✅ Publica como Release

### 3️⃣ Baixar

Vai na aba **Releases** e baixa o APK da integradora!

---

## 📊 Exemplos de Tags

```bash
# REDE versão 1.0.0
git tag rede-v1.0.0
git push origin rede-v1.0.0

# STONE versão 0.5.2
git tag stone-v0.5.2
git push origin stone-v0.5.2

# GETNET versão 2.3.1
git tag getnet-v2.3.1
git push origin getnet-v2.3.1
```

---

## 📚 Documentação Completa

Veja [TAGS-BUILD-GUIDE.md](TAGS-BUILD-GUIDE.md) para detalhes.

---

## 🐛 Acompanhar Build

1. Vai em **Actions** no GitHub
2. Escolhe o último workflow "Build APK por Integradora"
3. Vê o status em tempo real

Se falhar, os logs mostram exatamente o problema!
