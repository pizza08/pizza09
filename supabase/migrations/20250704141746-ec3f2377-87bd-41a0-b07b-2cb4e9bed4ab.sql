
-- Criar tabela para capturar leads
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  interesse TEXT, -- tipo de combo ou pizza de interesse
  mensagem TEXT,
  origem TEXT, -- de onde veio o lead (combo, whatsapp, etc)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para combos personalizáveis
CREATE TABLE public.combo_selections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  combo_id TEXT NOT NULL, -- referência ao combo (combo-family, combo-night, etc)
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  selected_pizzas JSONB NOT NULL, -- array de pizzas selecionadas
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.combo_selections ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir inserção pública (para capturar leads)
CREATE POLICY "Allow public insert on leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on combo_selections" 
  ON public.combo_selections 
  FOR INSERT 
  WITH CHECK (true);

-- Políticas para visualização (apenas admins podem ver)
CREATE POLICY "Allow admin select on leads" 
  ON public.leads 
  FOR SELECT 
  USING (false); -- Por enquanto ninguém pode ver, depois você pode configurar admin

CREATE POLICY "Allow admin select on combo_selections" 
  ON public.combo_selections 
  FOR SELECT 
  USING (false); -- Por enquanto ninguém pode ver, depois você pode configurar admin
