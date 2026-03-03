# Guia de Integração por Integradora

Este documento descreve como integrar a API de cada integradora de maquininha no app React Native.

## 🏗️ Arquitetura

```
App.tsx
├── (Verificar qual integradora está configurada)
│
└── src/
    └── integracoes/
        ├── rede/
        │   ├── api.ts
        │   ├── config.ts
        │   └── types.ts
        ├── stone/
        │   ├── api.ts
        │   ├── config.ts
        │   └── types.ts
        └── getnet/
            ├── api.ts
            ├── config.ts
            └── types.ts
```

## 🔑 Variáveis de Ambiente por Integradora

Cada integradora pode ter suas próprias variáveis e segredos. Você pode adicionar suporte para isso da seguinte forma:

### Exemplo: Criar `.env.{integradora}`

```bash
# .env.rede
REDE_API_KEY=sua_chave_rede
REDE_MERCHANT_ID=seu_merchant_id_rede
REDE_ENV=sandbox

# .env.stone
STONE_API_KEY=sua_chave_stone
STONE_ACCOUNT_ID=sua_account_stone
STONE_ENV=sandbox

# .env.getnet
GETNET_API_KEY=sua_chave_getnet
GETNET_SELLER_ID=seu_seller_getnet
GETNET_ENV=sandbox
```

### Carregar variáveis dinâmicas no build.gradle

```gradle
def loadAdministratorEnv(String admin) {
    def envFile = file("../.env.${admin.toLowerCase()}")
    if (envFile.exists()) {
        envFile.readLines().each { line ->
            if (line && !line.startsWith('#')) {
                def parts = line.split('=', 2)
                if (parts.size() == 2) {
                    def key = parts[0].trim()
                    def value = parts[1].trim()
                    buildConfigField "String", key, "\"${value}\""
                }
            }
        }
    }
}

// No defaultConfig:
loadAdministratorEnv(administrator)
```

## 📱 Como Usar no Código

### 1. Criar um contexto/hook para detectar integradora

```typescript
// src/hooks/useIntegradora.ts
import { useMemo } from 'react';
import { NativeModules } from 'react-native';

export const useIntegradora = () => {
  const integradora = useMemo(() => {
    // Tentar obter do BuildConfig (compile-time)
    // const admin = NativeModules.SettingsManager?.settings?.ADMINISTRATOR || 'REDE';

    // Ou armazenar em AsyncStorage se precisar mudar em runtime
    return 'REDE'; // Placeholder
  }, []);

  return integradora;
};
```

### 2. Criar factory para retornar API correta

```typescript
// src/integracoes/factory.ts
import { RedeAPI } from './rede/api';
import { StoneAPI } from './stone/api';
import { GetnetAPI } from './getnet/api';

export interface IntegradoraAPI {
  processar_pagamento(valor: number, token: string): Promise<any>;
  consultar_status(transacao_id: string): Promise<any>;
  reembolsar(transacao_id: string, valor?: number): Promise<any>;
}

export const getIntegradoraAPI = (integradora: string): IntegradoraAPI => {
  switch (integradora.toUpperCase()) {
    case 'REDE':
      return new RedeAPI();
    case 'STONE':
      return new StoneAPI();
    case 'GETNET':
      return new GetnetAPI();
    default:
      throw new Error(`Integradora desconhecida: ${integradora}`);
  }
};
```

### 3. Usar em um componente

```typescript
// src/screens/PagamentoScreen.tsx
import { useIntegradora } from '../hooks/useIntegradora';
import { getIntegradoraAPI } from '../integracoes/factory';

export const PagamentoScreen = () => {
  const integradora = useIntegradora();
  const api = getIntegradoraAPI(integradora);

  const processar_pagamento = async (valor: number, token: string) => {
    try {
      const resultado = await api.processar_pagamento(valor, token);
      console.log('Pagamento processado:', resultado);
    } catch (erro) {
      console.error('Erro ao processar:', erro);
    }
  };

  return (
    <View>
      <Text>Integradora: {integradora}</Text>
      <Button
        title="Processar Pagamento"
        onPress={() => processar_pagamento(100, 'token123')}
      />
    </View>
  );
};
```

## 🔌 Estrutura de Cada Integradora

### REDE

**Documentação**: https://github.com/DeveloperRede/rest-docs

```typescript
// src/integracoes/rede/config.ts
export const REDE_CONFIG = {
  api_url: 'https://api.userede.com.br',
  timeout: 30000,
  // Adicione configurações específicas
};
```

### STONE

**Documentação**: https://developers.stone.com.br

```typescript
// src/integracoes/stone/config.ts
export const STONE_CONFIG = {
  api_url: 'https://api.stone.com.br',
  timeout: 30000,
};
```

### GETNET

**Documentação**: https://www.getnet.com.br/developer

```typescript
// src/integracoes/getnet/config.ts
export const GETNET_CONFIG = {
  api_url: 'https://api.getnet.com.br',
  timeout: 30000,
};
```

## 🧪 Testes

```typescript
// src/__tests__/integracoes.test.ts
import { getIntegradoraAPI } from '../integracoes/factory';

describe('IntegradorasAPI', () => {
  it('deve retornar API REDE', () => {
    const api = getIntegradoraAPI('REDE');
    expect(api).toBeDefined();
  });

  it('deve retornar API STONE', () => {
    const api = getIntegradoraAPI('STONE');
    expect(api).toBeDefined();
  });

  it('deve lançar erro para integradora inválida', () => {
    expect(() => getIntegradoraAPI('INVALIDA')).toThrow();
  });
});
```

## 📚 Referências

- [Rede API](https://github.com/DeveloperRede/rest-docs)
- [Stone API](https://developers.stone.com.br/docs)
- [Getnet API](https://www.getnet.com.br/developer/doc)

## 💡 Dicas

1. **Use interfaces TypeScript** para garantir consistência entre integradoras
2. **Crie testes unitários** para cada integradora
3. **Use variáveis de ambiente** para credenciais (nunca hardcode!)
4. **Documente mudanças de API** em um changelog
5. **Mantenha compatibilidade** com versões anteriores quando possível
