# 🔧 Checklist de Troubleshooting

## ✅ Verificar se o Workflow está Rodando

### 1. Acessar GitHub Actions
```
GitHub → Seu Repo → Actions → "Build APK por Integradora"
```

### 2. Você deve ver:
- ✅ Um novo workflow run apararceu com a tag `stone-v1.0.0`
- ✅ Status: Em execução (🟡) ou Concluído (🟢/🔴)

---

## 🐛 Se nada aparecer...

### Problema 1: Repositório é Privado?

**Solução:**
1. GitHub → Settings → Actions → General
2. Marque: "Allow all actions and reusable workflows"
3. Click "Save"

---

### Problema 2: Workflow Está Desativado?

**Solução:**
1. GitHub → Actions → Workflows
2. Procure "Build APK por Integradora"
3. Se tiver ⛔ desabilitado, click em "Enable workflow"

---

### Problema 3: Erro no YAML?

**Solução:**
Veja os logs:
1. GitHub → Actions → "Build APK por Integradora" → Último run
2. Click na job "build" ou "extract-tag-info"
3. Procure por erros em vermelho

---

## 🚀 Próximos Testes

Se tudo está OK, tente uma nova tag:

```bash
# Teste com GETNET
git tag getnet-v0.5.0
git push origin getnet-v0.5.0

# Ou mais uma REDE
git tag rede-v1.1.0
git push origin rede-v1.1.0
```

---

## 📊 Entender o Workflow

O workflow deve:
1. ✅ Detectar a tag (`stone-v1.0.0`)
2. ✅ Extrair integradora (`STONE`) e versão (`1.0.0`)
3. ✅ Fazer checkout do código
4. ✅ Instalar dependências (Node.js, JDK, Android SDK)
5. ✅ Criar `.env` com `ADMINISTRATOR=STONE`
6. ✅ Compilar APK
7. ✅ Publicar APK em Releases

Se falhar em qualquer etapa, os logs mostram**exatamente** onde

---

## 💡 Dica: Commits vs Tags

- **Commits**: `git push origin main` → Roda em push normal
- **Tags**: `git push origin {tag}` → Roda **só** em tags novo push

Se empurrar a tag **antes** de corrigir o workflow, no próximo push de tag já usa a versão corrigida!
