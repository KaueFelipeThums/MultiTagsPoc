# Status das Integradoras

Este arquivo documenta o status de cada integradora e suas últimas versões.

## 📊 Sinopse

| Integradora | Última Tag | Versão | Status | Data Release |
|-------------|-----------|--------|--------|--------------|
| REDE        | rede-v1.0.0 | 1.0.0 | 🟢 Ativa | - |
| STONE       | stone-v1.0.0 | 1.0.0 | 🟢 Ativa | - |
| GETNET      | getnet-v1.0.0 | 1.0.0 | 🟢 Ativa | - |

**Legenda**:
- 🟢 Ativa (versão estável disponível)
- 🟡 Em desenvolvimento (feature branch ativo)
- 🔴 Inativa (sem release recente)

## 📝 Histórico de Releases

### REDE

```
rede-v1.0.0  - Data: ---
  - Feature inicial
  - Integração com API REDE
```

### STONE

```
stone-v1.0.0 - Data: ---
  - Feature inicial
  - Integração com API STONE
```

### GETNET

```
getnet-v1.0.0 - Data: ---
  - Feature inicial
  - Integração com API GETNET
```

## 🚀 Fluxo de Desenvolvimento

### 1. Criar branch para nova feature

```bash
# Exemplo: novo método de pagamento para REDE
git checkout -b feature/rede-novo-pagamento
```

### 2. Desenvolver e testar

```bash
# Build local
./scripts/build-apk.sh REDE
```

### 3. Fazer PR

- Descrever bem as mudanças
- Testar em múltiplos dispositivos
- Aguardar aprovação

### 4. Merge para main

```bash
git checkout main
git merge feature/rede-novo-pagamento
```

### 5. Criar tag de release

```bash
./scripts/create-tag.sh rede 1.1.0 "Novo método de pagamento"
```

### 6. Release GitHub

A tag dispara automaticamente o CI/CD que:
- ✅ Faz build do APK
- ✅ Publica na seção de Releases
- ✅ Deixa disponível para download

---

## 🔄 Fluxo de Hotfix

Para corrigir bugs em versions já lançadas:

```bash
# 1. Criar branch de hotfix
git checkout -b hotfix/rede-corrigir-bug main

# 2. Corrigir e testar
./scripts/build-apk.sh REDE

# 3. Merge de volta
git checkout main
git merge hotfix/rede-corrigir-bug

# 4. Criar nova tag patch
./scripts/create-tag.sh rede 1.0.1 "Corrigido bug de pagamento"
```

---

## 📦 Versionamento

Seguindo **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **MAJOR** (1.0.0 → 2.0.0): Mudanças incompatíveis na API
- **MINOR** (1.0.0 → 1.1.0): Nova feature compatível
- **PATCH** (1.0.0 → 1.0.1): Hotfix/correção de bug

Exemplos de tags:
- `rede-v1.0.0` - Release inicial
- `rede-v1.1.0` - Nova feature
- `rede-v1.0.1` - Hotfix
- `rede-v2.0.0` - Breaking change

---

## ✅ Checklist de Release

Antes de criar uma tag:

- [ ] Código testado localmente
- [ ] Testes unitários passando
- [ ] README atualizado
- [ ] CHANGELOG atualizado
- [ ] Versão atualizada em package.json
- [ ] Nenhuma dependência desatualizada com vulnerabilidades
- [ ] Code review aprovado
- [ ] Build local bem-sucedido

---

## 🔗 Links Úteis

- [Workflow Build APK](.github/workflows/build-apk.yml)
- [Guia de Tags](TAGS-BUILD-GUIDE.md)
- [Integração de Maquininhas](INTEGRACAO-MAQUININHAS.md)
- [Scripts Disponíveis](scripts/)

---

## 📞 Suporte

Para dúvidas sobre o status ou fluxo de release, consulte o guia de tags ou abra uma issue.
