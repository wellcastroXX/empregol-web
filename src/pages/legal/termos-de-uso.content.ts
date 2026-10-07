/**
 * Conteúdo dos Termos de Uso, transcrito do PDF em
 * `src/assets/others/termos-de-uso–empregol.pdf` (16 páginas, versão de
 * 01/10/2026).
 *
 * Texto em vez de PDF embutido: lê bem no celular, o Ctrl+F do navegador
 * encontra, o buscador indexa e a edição de uma cláusula é um diff de uma
 * linha. Ao atualizar o documento, atualize os dois — o PDF segue no repo
 * como a versão assinada.
 *
 * `**destaque**` marca as cláusulas que o próprio documento grifa (Cláusula
 * 1.2: as que limitam direitos do Usuário vão em destaque).
 */

export interface LegalTable {
  head: readonly string[]
  rows: readonly (readonly string[])[]
}

export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: readonly string[] }
  | { kind: 'table'; table: LegalTable }
  | { kind: 'subtitle'; text: string }

export interface LegalSection {
  /** Numeração do documento — vira âncora (`#clausula-3`) e marcador visual. */
  number: string
  title: string
  blocks: readonly LegalBlock[]
}

export const DOCUMENT_TITLE = 'Termos de Uso'

export const DOCUMENT_VERSION = 'Versão [1.0] — vigente a partir de [data].'

export const DOCUMENT_PLACE_DATE = 'Florianópolis, 01 de outubro de 2026.'

export const SECTIONS: readonly LegalSection[] = [
  {
    number: '1',
    title: 'Das Partes e do Aceite',
    blocks: [
      {
        kind: 'p',
        text: '1.1. Estes Termos de Uso e Condições Gerais ("Termos") regulam o acesso e o uso do aplicativo, site e demais serviços da plataforma EMPREGOL ("Plataforma" ou "Serviço"), sociedade empresária limitada inscrita no CNPJ sob o nº 67.738.429/0001-51, com sede na cidade de Florianópolis – Santa Catarina, CEP 88.015-701 ("Empregol", "nós" ou "nosso").',
      },
      {
        kind: 'p',
        text: '1.2. Estes Termos constituem contrato de adesão, nos termos do art. 54 da Lei nº 8.078/1990 (Código de Defesa do Consumidor), quando aplicável. As cláusulas que limitam direitos do Usuário estão redigidas em destaque, para sua imediata e fácil compreensão.',
      },
      {
        kind: 'p',
        text: '1.3. Ao criar uma conta, marcar a caixa de aceite ou utilizar a Plataforma, o Usuário declara ter lido, compreendido e aceitado integralmente estes Termos, a Política de Privacidade e as demais políticas da Empregol a eles vinculadas. Quem não concordar com estes Termos não deve utilizar a Plataforma.',
      },
      {
        kind: 'p',
        text: '1.4. Quando o Usuário for pessoa jurídica (clube, agência ou empresa de intermediação), a pessoa natural que realiza o cadastro declara possuir poderes para vinculá-la a estes Termos.',
      },
      {
        kind: 'p',
        text: '1.5. Quando o Usuário for menor de 18 (dezoito) anos, o aceite destes Termos deve ser realizado por seu pai, mãe ou responsável legal, na forma da Cláusula 3.',
      },
    ],
  },
  {
    number: '2',
    title: 'Definições',
    blocks: [
      { kind: 'p', text: '2.1. Para os fins destes Termos, consideram-se:' },
      {
        kind: 'table',
        table: {
          head: ['Termo', 'Significado'],
          rows: [
            [
              'Usuário',
              'Toda pessoa natural ou jurídica cadastrada na Plataforma, em qualquer categoria.',
            ],
            [
              'Atleta',
              'Praticante de futebol, profissional ou amador, a partir de 14 anos, que cadastra seu perfil esportivo.',
            ],
            [
              'Clube',
              'Entidade de prática desportiva, profissional ou amadora, regularmente constituída.',
            ],
            [
              'Agente',
              'Agente esportivo, intermediário ou empresário, pessoa natural ou jurídica, habilitado na forma da Cláusula 3.4.',
            ],
            ['Contratante', 'Clube ou Agente, quando utiliza a Plataforma para buscar Atletas.'],
            [
              'Responsável Legal',
              'Pai, mãe, tutor ou guardião que representa ou assiste o Atleta menor de 18 anos.',
            ],
            [
              'Plano',
              'Modalidade de assinatura, gratuita ou paga, que define as funcionalidades disponíveis (Anexo I).',
            ],
            [
              'Conteúdo',
              'Textos, fotos, vídeos, estatísticas, documentos, mensagens e quaisquer informações inseridos pelo Usuário.',
            ],
            [
              'Validação',
              'Checagem de identidade e de documentos realizada pela Empregol como condição de aprovação do cadastro.',
            ],
            [
              'Parceiros',
              'Terceiros que oferecem produtos ou serviços por meio da Plataforma ou integrados a ela.',
            ],
            ['Chat', 'Canal de mensagens interno da Plataforma.'],
          ],
        },
      },
    ],
  },
  {
    number: '3',
    title: 'Quem Pode Usar a Plataforma',
    blocks: [
      {
        kind: 'p',
        text: '3.1. Podem se cadastrar na Plataforma, desde que aprovados na Validação:',
      },
      {
        kind: 'list',
        items: [
          '(a) Atletas a partir de 14 (quatorze) anos completos;',
          '(b) Clubes profissionais e amadores regularmente constituídos;',
          '(c) Agentes e empresários que possuam credenciamento e qualificação para a atividade, na forma da Cláusula 3.4.',
        ],
      },
      {
        kind: 'p',
        text: '3.2. **Atletas menores de 18 anos.** O cadastro de Atleta menor de 18 (dezoito) anos depende de autorização e aceite do Responsável Legal, observados o Código Civil, a Lei nº 8.069/1990 (ECA), a Lei nº 13.709/2018 (LGPD) e a Lei nº 15.211/2025 (Estatuto Digital da Criança e do Adolescente). Em especial:',
      },
      {
        kind: 'list',
        items: [
          '(a) o Atleta entre 14 e 16 anos será representado pelo Responsável Legal, e sua conta permanecerá obrigatoriamente vinculada à conta do Responsável Legal;',
          '(b) o Atleta entre 16 e 18 anos será assistido pelo Responsável Legal, que deverá aceitar estes Termos em conjunto com ele;',
          '(c) a idade será aferida por meio de documento oficial na Validação, não sendo admitida a mera autodeclaração;',
          '(d) as configurações de privacidade da conta do Atleta menor serão, por padrão, as mais protetivas disponíveis, e o Responsável Legal terá acesso às ferramentas de supervisão parental oferecidas pela Plataforma, incluindo a gestão da conta, das contratações e a identificação dos Contratantes com quem o Atleta se comunica;',
          '(e) a contratação de Planos pagos e de serviços de Parceiros por Atleta menor depende de autorização do Responsável Legal.',
        ],
      },
      {
        kind: 'p',
        text: '3.3. O Responsável Legal responde pela veracidade das informações prestadas, pelo acompanhamento do uso da Plataforma pelo menor e pelas decisões tomadas em nome dele.',
      },
      {
        kind: 'p',
        text: '3.4. **Agentes.** O cadastro de Agente exige a comprovação, conforme o caso, de: (i) licença ou registro válido perante a Confederação Brasileira de Futebol (CBF), a FIFA ou a entidade de administração do desporto competente; ou (ii) enquadramento nas hipóteses legais de dispensa de registro, como parente em primeiro grau, cônjuge ou advogado do Atleta, quando expressamente outorgado (art. 95, § 1º, da Lei nº 14.597/2023). O Agente obriga-se a manter seu credenciamento válido e a informar imediatamente qualquer suspensão, cassação ou vencimento.',
      },
      {
        kind: 'p',
        text: '3.5. **Clubes.** O cadastro de Clube exige a comprovação de sua regular constituição e, quando aplicável, de sua filiação a federação ou entidade de administração do desporto.',
      },
      {
        kind: 'p',
        text: '3.6. **Observância da legislação esportiva.** Agentes e Clubes devem atuar na Plataforma, inclusive em suas relações com Atletas menores de 18 anos e seus Responsáveis Legais, com observância da Lei nº 9.615/1998, no que vigente, e dos regulamentos da CBF e da FIFA sobre intermediários e menores, sendo exclusivamente responsáveis pelo seu cumprimento.',
      },
      {
        kind: 'p',
        text: '3.7. A Empregol poderá recusar, a seu critério e de forma fundamentada, cadastros que não preencham os requisitos destes Termos, bem como solicitar documentos adicionais a qualquer tempo.',
      },
    ],
  },
  {
    number: '4',
    title: 'Cadastro, Validação e Conta',
    blocks: [
      {
        kind: 'p',
        text: '4.1. Para utilizar a Plataforma, cada Usuário deverá inscrever-se, fornecer as informações e documentos solicitados, ser aprovado na Validação e preencher os requisitos da Cláusula 3. As funcionalidades disponíveis dependem do Plano contratado (Anexo I).',
      },
      {
        kind: 'p',
        text: '4.2. O Usuário declara que todas as informações fornecidas são verdadeiras, completas e atualizadas, e obriga-se a mantê-las assim durante todo o uso da Plataforma.',
      },
      {
        kind: 'p',
        text: '4.3. A Validação consiste em conferência formal de identidade e de documentos com base nas informações e arquivos apresentados pelo próprio Usuário e, quando disponível, em consulta a bases de terceiros. **A Validação não constitui garantia, certificação ou auditoria da Empregol quanto à veracidade, qualidade, desempenho esportivo, situação contratual ou idoneidade de qualquer Usuário.** As indicações de "documentos conferidos" exibidas na Plataforma informam apenas a data da última conferência realizada.',
      },
      {
        kind: 'p',
        text: '4.4. Os dados coletados exclusivamente para aferição de idade serão utilizados unicamente para essa finalidade, na forma do art. 13 da Lei nº 15.211/2025.',
      },
      {
        kind: 'p',
        text: '4.5. O Usuário selecionará um nome de usuário ou identificador semelhante para sua conta. A Empregol poderá alterá-lo se entender adequado ou necessário, por exemplo quando violar direitos de terceiros, induzir outros Usuários a erro, utilizar marca alheia ou contrariar estes Termos, comunicando o Usuário.',
      },
      {
        kind: 'p',
        text: '4.6. A conta é pessoal e intransferível. O Usuário é responsável pela guarda de sua senha e por todas as atividades realizadas em sua conta, devendo comunicar imediatamente à Empregol qualquer uso não autorizado.',
      },
      {
        kind: 'p',
        text: '4.7. É vedado manter mais de uma conta na mesma categoria, criar contas em nome de terceiros sem autorização, ou criar nova conta após exclusão determinada pela Empregol.',
      },
    ],
  },
  {
    number: '5',
    title: 'Planos, Preços e Pagamento',
    blocks: [
      {
        kind: 'p',
        text: '5.1. Os Planos, suas funcionalidades e preços estão descritos no Anexo I, que integra estes Termos, e na própria Plataforma. Em caso de divergência, prevalecerá a informação exibida na Plataforma no momento da contratação.',
      },
      {
        kind: 'p',
        text: '5.2. Os Planos podem ser contratados nas periodicidades mensal, semestral ou anual. Nos Planos semestral e anual, o valor mensal indicado corresponde ao total do período dividido pelo número de meses, podendo ser pago à vista ou parcelado, conforme opções exibidas na Plataforma.',
      },
      {
        kind: 'p',
        text: '5.3. **Meios de pagamento.** Os pagamentos serão realizados exclusivamente pelos meios disponibilizados na Plataforma, podendo ser processados por instituições de pagamento ou lojas de aplicativos parceiras, cujas regras também se aplicam à transação.',
      },
      {
        kind: 'p',
        text: '5.4. **Renovação automática.** Salvo cancelamento pelo Usuário antes do término do período vigente, o Plano será renovado automaticamente por igual periodicidade, pelo preço vigente na data da renovação, mediante aviso prévio por e-mail ou notificação na Plataforma.',
      },
      {
        kind: 'p',
        text: '5.5. **Reajuste.** Os preços dos Planos serão reajustados anualmente, a cada 12 (doze) meses contados da contratação, pela variação do IPCA/IBGE ou, para Usuários em outros países, pelo índice oficial de inflação ao consumidor do país em que o aplicativo for disponibilizado. Qualquer alteração de preço que não decorra do reajuste será comunicada com antecedência mínima de 30 (trinta) dias e somente se aplicará a partir do período seguinte, podendo o Usuário cancelar sem ônus.',
      },
      {
        kind: 'p',
        text: '5.6. **Direito de arrependimento.** O Usuário consumidor poderá desistir da contratação no prazo de 7 (sete) dias contados da contratação, com restituição integral dos valores pagos, nos termos do art. 49 do Código de Defesa do Consumidor.',
      },
      {
        kind: 'p',
        text: '5.7. **Cancelamento.** O Usuário pode cancelar o Plano a qualquer tempo pela própria Plataforma. No Plano mensal, o cancelamento produz efeitos ao final do período já pago, sem reembolso proporcional. Nos Planos semestral e anual, após o prazo de arrependimento, o Usuário poderá optar por: (i) manter o acesso até o fim do período contratado; ou (ii) receber a restituição dos meses não utilizados, descontada a diferença entre o preço mensal cheio e o preço promocional aplicado aos meses já utilizados.',
      },
      {
        kind: 'p',
        text: '5.8. **Inadimplência.** A ausência de pagamento regular por mais de 5 (cinco) dias contados do vencimento **acarretará o cancelamento do Plano pago**, com o retorno da conta ao Plano gratuito, quando existente, sem prejuízo da cobrança dos valores vencidos. A Empregol informará o Usuário sobre a pendência pelo e-mail cadastrado ou por notificação na Plataforma.',
      },
      {
        kind: 'p',
        text: '5.9. **Promoções.** Promoções, descontos, períodos de teste e gratuidades são válidos apenas pelo prazo e nas condições indicadas em cada oferta, não gerando direito adquirido, extensão automática ou obrigação de renovação nas mesmas condições.',
      },
      {
        kind: 'p',
        text: '5.10. **Serviços de Parceiros.** O valor das sessões e serviços contratados com Parceiros (Cláusula 8.5) é pago pelo Usuário à parte, não estando incluído no preço do Plano.',
      },
      {
        kind: 'p',
        text: '5.11. **Alteração dos Planos.** Os Planos poderão sofrer alterações, definitivas ou temporárias, em seus valores, condições e serviços, a critério da Empregol. Alterações que impliquem aumento de preço ou redução de funcionalidades de Plano já contratado serão comunicadas com antecedência mínima de 30 (trinta) dias e aplicar-se-ão a partir do período seguinte, podendo o Usuário cancelar sem ônus antes de sua vigência.',
      },
    ],
  },
  {
    number: '6',
    title: 'Regras de Conduta',
    blocks: [
      {
        kind: 'p',
        text: '6.1. **Respeito e não discriminação.** A Plataforma é um ambiente de tratamento respeitoso. É expressamente proibido publicar, enviar ou praticar, por qualquer meio na Plataforma, inclusive no Chat:',
      },
      {
        kind: 'list',
        items: [
          '(a) racismo, injúria racial ou qualquer forma de discriminação por raça, cor, etnia, origem, nacionalidade, religião, sexo, gênero, orientação sexual, deficiência, idade ou condição social;',
          '(b) assédio moral ou sexual, ameaça, intimidação, perseguição, cyberbullying ou discurso de ódio;',
          '(c) conteúdo violento, pornográfico, de cunho sexual ou que exponha crianças e adolescentes a situações inadequadas;',
          '(d) promoção de apostas, jogos de azar, manipulação de resultados, tabaco, bebidas alcoólicas ou substâncias proibidas.',
        ],
      },
      {
        kind: 'p',
        text: '6.2. **Atos ilícitos e enganosos.** O Usuário não pode utilizar a Plataforma para fazer algo ilícito, enganoso, fraudulento, ou com finalidade ilegal ou não autorizada, incluindo prometer vagas, testes ou contratos inexistentes, cobrar valores indevidos de Atletas ou de seus responsáveis, ou se passar por outra pessoa, clube ou agente.',
      },
      { kind: 'p', text: '6.3. **Uso técnico indevido.** O Usuário não pode:' },
      {
        kind: 'list',
        items: [
          '(a) tentar criar contas, ou acessar ou coletar informações, por meios não autorizados, inclusive por robôs, scrapers ou ferramentas automatizadas;',
          '(b) modificar, traduzir, criar trabalhos derivados ou aplicar engenharia reversa na Plataforma ou em seus componentes;',
          '(c) fazer, ou tentar fazer, qualquer coisa para burlar, contornar ou substituir medidas tecnológicas que controlem ou limitem o acesso ao Serviço ou aos dados;',
          '(d) introduzir vírus, códigos maliciosos ou sobrecarregar a infraestrutura da Plataforma.',
        ],
      },
      {
        kind: 'p',
        text: '6.4. **Uso de dados de terceiros.** O Usuário não pode utilizar, armazenar, comercializar ou divulgar, para si ou para terceiros, dados de outros Usuários obtidos na Plataforma fora da finalidade de aproximação esportiva a que ela se destina. A exportação de currículo em PDF permitida em determinados Planos destina-se exclusivamente à avaliação esportiva interna do Contratante e de clubes parceiros com quem esteja em negociação legítima.',
      },
      {
        kind: 'p',
        text: '6.5. **Canal oficial.** O Chat disponível no aplicativo é o meio adequado e oficial para os contatos entre Usuários iniciados na Plataforma. Contatos com Atletas menores de 18 anos devem ocorrer pela Plataforma, com ciência do Responsável Legal.',
      },
      {
        kind: 'p',
        text: '6.6. **Denúncias.** Qualquer Usuário pode denunciar condutas que violem estes Termos pelo canal de denúncias da Plataforma. Denúncias envolvendo violação de direitos de crianças e adolescentes serão tratadas com prioridade e, quando cabível, comunicadas às autoridades competentes. O uso abusivo do canal de denúncias também constitui violação destes Termos.',
      },
      {
        kind: 'p',
        text: '6.7. A violação desta Cláusula sujeita o Usuário às medidas da Cláusula 10, sem prejuízo de sua responsabilidade civil e criminal e da comunicação às autoridades competentes.',
      },
    ],
  },
  {
    number: '7',
    title: 'Conteúdo, Licença, Imagem e Propriedade Intelectual',
    blocks: [
      {
        kind: 'p',
        text: '7.1. **Titularidade do Conteúdo.** A Empregol não reivindica a propriedade do Conteúdo inserido pelo Usuário. O Usuário declara ser titular dos direitos sobre o Conteúdo que publica ou possuir as autorizações necessárias, inclusive de terceiros que nele apareçam, e responde integralmente por ele.',
      },
      {
        kind: 'p',
        text: '7.2. **Licença à Empregol.** Ao publicar Conteúdo, o Usuário concede à Empregol licença não exclusiva, gratuita, mundial, transferível a empresas parceiras ou do mesmo grupo e sublicenciável a prestadores de serviço da Plataforma, para hospedar, armazenar, reproduzir, adaptar tecnicamente (por exemplo, compressão e formatação), exibir e distribuir o Conteúdo, pelo tempo em que permanecer na Plataforma, para operar, exibir aos demais Usuários, integrar a outros sistemas (Cláusula 9.7) e promover o Serviço.',
      },
      {
        kind: 'p',
        text: '7.3. **Direito de imagem.** O Usuário autoriza, a título gratuito, o uso de sua imagem, nome, voz e desempenho esportivo constantes do Conteúdo publicado na Plataforma: (a) para exibição e integração entre os demais Usuários, conforme o Plano de cada um; e (b) em peças de publicidade e divulgação da própria Plataforma, em quaisquer meios, observado o disposto no art. 20 do Código Civil. A autorização prevista na alínea (b) poderá ser revogada a qualquer tempo pelas configurações da conta, com efeitos para novas peças a partir da revogação.',
      },
      {
        kind: 'p',
        text: '7.4. **Imagem de menores.** O uso da imagem de Atleta menor de 18 anos em publicidade da Plataforma deverá ser verificada por seu tutor ou responsável que desde já autoriza sua coleta e tratamento que e observará sempre o melhor interesse do menor, sendo vedada qualquer exposição vexatória, erotizada ou incompatível com sua condição de pessoa em desenvolvimento.',
      },
      {
        kind: 'p',
        text: '7.5. **Direitos da Empregol.** A marca Empregol, o aplicativo, o software, o código-fonte, o layout, as bases de dados, os textos, os relatórios e demais elementos da Plataforma são de titularidade exclusiva da Empregol ou de seus licenciantes, protegidos pelas Leis nº 9.279/1996, nº 9.610/1998 e nº 9.609/1998. Nenhuma disposição destes Termos transfere ao Usuário qualquer direito sobre eles, além da licença limitada, revogável e intransferível de uso da Plataforma conforme o Plano contratado.',
      },
      {
        kind: 'p',
        text: '7.6. **Conteúdo de outros Usuários.** É proibido ao Usuário copiar, baixar, reproduzir, editar, publicar ou utilizar, fora da Plataforma, Conteúdo de outro Usuário, inclusive vídeos, fotos e estatísticas, sem a prévia e expressa autorização de seu titular, ressalvado o uso permitido pelas funcionalidades do Plano.',
      },
      {
        kind: 'p',
        text: '7.7. **Remoção de Conteúdo.** A Empregol pode remover qualquer Conteúdo ou informação que o Usuário compartilhar na Plataforma se entender que viola estes Termos, as políticas da Empregol ou a legislação, ou mediante notificação de terceiros na forma da lei. Sempre que possível, o Usuário será notificado do motivo da remoção e poderá apresentar recurso pelos canais da Plataforma.',
      },
    ],
  },
  {
    number: '8',
    title: 'Natureza do Serviço e Limitação de Responsabilidade',
    blocks: [
      {
        kind: 'p',
        text: '8.1. **Natureza do Serviço.** A Empregol é uma plataforma tecnológica de aproximação entre Atletas, Clubes e Agentes. **A Empregol não atua como agente, intermediário, procurador, empregador ou parceiro de nenhum Usuário, não participa nem é parte de quaisquer negociações, propostas, testes, contratos de trabalho, de representação ou de transferência celebrados entre Usuários, e não recebe comissão sobre eles.**',
      },
      {
        kind: 'p',
        text: '8.2. **Ausência de garantia de resultado.** **A Empregol não garante que o Atleta será contratado, avaliado ou contatado, nem que o Clube ou o Agente encontrará o Atleta que pretende.** A visibilidade, a prioridade de exibição e os alertas descritos nos Planos não asseguram qualquer resultado.',
      },
      {
        kind: 'p',
        text: '8.3. **Informações prestadas pelos Usuários.** **A Empregol não verifica a veracidade das informações e dados inseridos pelos Usuários. Todo o Conteúdo e as informações exibidos na Plataforma são inseridos pelos próprios Usuários, que respondem exclusivamente por sua veracidade, exatidão e atualização, cabendo a cada Usuário agir adequadamente, com a devida habilitação e em respeito à legislação aplicável.** A Validação prevista na Cláusula 4.3 limita-se à conferência formal de identidade e documentos para aprovação do cadastro e não importa confirmação do conteúdo das informações. A Empregol não se responsabiliza por informações inverídicas, incompletas, desatualizadas ou enganosas fornecidas por Usuários, ressalvado o dever de agir diante de notificação ou de indícios concretos de irregularidade.',
      },
      {
        kind: 'p',
        text: '8.4. **Dever de diligência do Usuário.** Cabe a cada Usuário verificar, por seus próprios meios e antes de qualquer compromisso, a veracidade das informações, a identidade, o credenciamento, a situação contratual e a idoneidade do outro Usuário. Cada Usuário é exclusivamente responsável pelo que faz, publica, promete, negocia e contrata.',
      },
      {
        kind: 'p',
        text: '8.5. **Serviços de Parceiros e anunciantes.** Os serviços de Parceiros oferecidos aos Atletas do Plano Premium (por exemplo, saúde mental, jurídico, financeiro e preparação física) são prestados diretamente pelos Parceiros, sob sua exclusiva responsabilidade técnica e profissional, mediante pagamento à parte. **A Empregol não se responsabiliza pela qualidade, adequação, resultado ou forma de prestação dos serviços de Parceiros, nem pelos produtos ou serviços de anunciantes exibidos na Plataforma.** A Empregol empenhará esforços razoáveis para selecionar Parceiros idôneos e encaminhará reclamações que receber.',
      },
      {
        kind: 'p',
        text: '8.6. **Disponibilidade.** A Empregol empregará esforços razoáveis para manter a Plataforma disponível, mas não garante funcionamento ininterrupto ou livre de erros, podendo haver interrupções para manutenção, atualização ou por fatores alheios ao seu controle.',
      },
      {
        kind: 'p',
        text: '8.7. **Limite.** **Na máxima extensão permitida pela legislação aplicável, a responsabilidade da Empregol perante o Usuário fica limitada aos danos diretos comprovadamente causados por ela, excluídos lucros cessantes e perda de oportunidade decorrentes de negociações entre Usuários.** Nada nestes Termos exclui direitos irrenunciáveis do consumidor previstos na Lei nº 8.078/1990.',
      },
    ],
  },
  {
    number: '9',
    title: 'Proteção de Dados Pessoais',
    blocks: [
      {
        kind: 'p',
        text: '9.1. A Empregol trata dados pessoais em conformidade com a Lei nº 13.709/2018 (LGPD), a Lei nº 12.965/2014 (Marco Civil da Internet) e a Lei nº 15.211/2025, na qualidade de controladora. As regras detalhadas constam da Política de Privacidade, que integra estes Termos.',
      },
      {
        kind: 'p',
        text: '9.2. **Finalidades e bases legais.** Os dados pessoais serão tratados, entre outras finalidades descritas na Política de Privacidade:',
      },
      {
        kind: 'table',
        table: {
          head: ['Finalidade', 'Base legal (LGPD)'],
          rows: [
            [
              'Cadastro, Validação, exibição de perfis e funcionamento do Chat',
              'Execução de contrato (art. 7º, V)',
            ],
            [
              'Prevenção a fraudes e segurança da Plataforma',
              'Legítimo interesse e proteção ao crédito (art. 7º, IX e X; art. 11, II, g)',
            ],
            [
              'Guarda de registros de acesso por 6 meses',
              'Obrigação legal (art. 15 do Marco Civil)',
            ],
            [
              'Relatórios, estatísticas e análises para melhoria e divulgação da Plataforma',
              'Legítimo interesse, preferencialmente com dados anonimizados ou agregados (art. 7º, IX)',
            ],
            [
              'Oferta de produtos e serviços da Empregol e de Parceiros',
              'Consentimento (art. 7º, I) ou legítimo interesse, conforme o caso',
            ],
            [
              'Compartilhamento com marcas esportivas, federações e empresas de marketing',
              'Consentimento específico (art. 7º, I)',
            ],
          ],
        },
      },
      {
        kind: 'p',
        text: '9.3. **Oferta de produtos.** O Usuário maior de 18 anos autoriza a Empregol a utilizar seus dados de cadastro e de uso da Plataforma para lhe oferecer produtos e serviços próprios ou de Parceiros relacionados ao futebol e ao desenvolvimento esportivo, podendo opor-se a qualquer tempo pelas configurações da conta ou pelo link de descadastro das comunicações.',
      },
      {
        kind: 'p',
        text: '9.4. **Compartilhamento com terceiros.** Mediante consentimento específico e destacado, coletado em separado destes Termos, o Usuário maior de 18 anos poderá autorizar a Empregol a compartilhar seus dados com empresas que ela entenda relacionadas ao objeto da Plataforma, como marcas esportivas, federações e entidades de administração do desporto e agências de marketing esportivo. O consentimento poderá ser revogado a qualquer tempo, sem prejuízo do uso da Plataforma.',
      },
      {
        kind: 'p',
        text: '9.5. **Compartilhamentos necessários.** Independentemente de consentimento, a Empregol poderá compartilhar dados: (a) com os demais Usuários, nos limites do Plano de cada um, por ser essa a própria finalidade do Serviço; (b) com prestadores de serviço que atuem como operadores, como hospedagem, processamento de pagamentos e verificação de identidade; (c) com Parceiros contratados pelo Usuário, na medida necessária à prestação do serviço; e (d) com autoridades, por obrigação legal ou ordem judicial.',
      },
      {
        kind: 'p',
        text: '9.6. **Dados de menores de 18 anos.** O tratamento de dados de Atletas menores observará o seu melhor interesse (art. 14 da LGPD) e a Lei nº 15.211/2025. **A Empregol não realizará perfilamento de Atletas menores de 18 anos para direcionamento de publicidade comercial, nem compartilhará seus dados com terceiros para fins publicitários ou de marketing.** O compartilhamento com federações ou entidades esportivas, quando necessário, dependerá de autorização do Responsável Legal.',
      },
      {
        kind: 'p',
        text: '9.7. **Integração com outros sistemas.** A Plataforma poderá ser integrada a sistemas e serviços de terceiros, como plataformas de vídeo, provedores de estatísticas esportivas, meios de pagamento, ferramentas de autenticação e serviços de Parceiros, por meio de APIs ou outras tecnologias. Nessas integrações, somente serão transmitidos os dados necessários à finalidade, e o Usuário poderá desconectar integrações opcionais a qualquer tempo.',
      },
      {
        kind: 'p',
        text: '9.8. **Relatórios e divulgação.** A Empregol poderá utilizar dados de uso da Plataforma para elaborar relatórios, análises e estatísticas, inclusive o relatório de novos talentos destinado aos Contratantes do Plano anual. Relatórios divulgados ao público ou a terceiros não Usuários conterão apenas dados anonimizados ou agregados, salvo consentimento do titular.',
      },
      {
        kind: 'p',
        text: '9.9. **Transferência internacional.** Por se tratar de plataforma de alcance mundial, dados poderão ser armazenados ou acessados fora do Brasil, observados os mecanismos do art. 33 da LGPD.',
      },
      {
        kind: 'p',
        text: '9.10. **Direitos do titular.** O Usuário pode, a qualquer tempo, exercer os direitos do art. 18 da LGPD (confirmação, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamentos e revogação do consentimento) pelo canal do Encarregado de Dados: [nome], [e-mail].',
      },
      {
        kind: 'p',
        text: '9.11. **Segurança.** A Empregol adota medidas técnicas e administrativas razoáveis para proteger os dados pessoais e comunicará aos titulares e à Autoridade Nacional de Proteção de Dados os incidentes de segurança que possam acarretar risco ou dano relevante, na forma da regulamentação.',
      },
    ],
  },
  {
    number: '10',
    title: 'Suspensão, Exclusão e Inatividade',
    blocks: [
      {
        kind: 'p',
        text: '10.1. **Irregularidades.** **Constatadas irregularidades graves, como fraude, falsidade documental ou de identidade, discriminação, assédio, risco a criança ou adolescente, ou atividade ilícita, a Empregol poderá suspender ou excluir a conta imediatamente, sem aviso prévio.** Nas demais violações destes Termos, a Empregol poderá advertir o Usuário, restringir funcionalidades ou suspender a conta, de forma proporcional à gravidade da conduta.',
      },
      {
        kind: 'p',
        text: '10.2. Em qualquer caso, o Usuário será informado da medida e de seu motivo, salvo quando a comunicação puder prejudicar investigação ou a segurança de terceiros, e poderá apresentar recurso pelos canais da Plataforma.',
      },
      {
        kind: 'p',
        text: '10.3. A exclusão por violação destes Termos não gera direito a reembolso dos valores pagos pelo período em curso, ressalvadas as hipóteses legais.',
      },
      {
        kind: 'p',
        text: '10.4. **Disponibilidade dos dados.** Os dados, Conteúdos e demais elementos do cadastro permanecerão disponíveis ao Usuário enquanto sua conta estiver ativa.',
      },
      {
        kind: 'p',
        text: '10.5. **Inatividade.** **A inatividade da conta por período superior a 1 (um) ano, sem Plano pago vigente, concede à Empregol o direito de excluir o cadastro**, mediante aviso prévio de 30 (trinta) dias enviado ao e-mail cadastrado, durante o qual o Usuário poderá reativar a conta ou solicitar cópia de seus dados.',
      },
      {
        kind: 'p',
        text: '10.6. **Exclusão a pedido.** O Usuário pode excluir sua conta a qualquer tempo pelas configurações da Plataforma.',
      },
      {
        kind: 'p',
        text: '10.7. Após a exclusão da conta, a Empregol eliminará os dados pessoais do Usuário, ressalvada a guarda pelo prazo necessário ao cumprimento de obrigação legal ou regulatória, ao exercício regular de direitos em processos e à prevenção de fraudes, nos termos do art. 16 da LGPD.',
      },
    ],
  },
  {
    number: '11',
    title: 'Alterações, Comunicações e Disposições Gerais',
    blocks: [
      {
        kind: 'p',
        text: '11.1. **Alterações.** A Empregol pode alterar o Serviço e suas políticas e, por isso, pode precisar alterar estes Termos para que reflitam com precisão o Serviço e as políticas vigentes. Alterações relevantes serão comunicadas com antecedência mínima de 30 (trinta) dias, por e-mail ou notificação na Plataforma. O uso continuado após a vigência da alteração implica concordância; o Usuário que não concordar poderá cancelar seu Plano sem ônus antes da data de vigência.',
      },
      {
        kind: 'p',
        text: '11.2. **Comunicações.** As comunicações da Empregol serão enviadas ao e-mail cadastrado ou por notificação na Plataforma. Comunicações do Usuário à Empregol devem ser feitas pelo canal de atendimento: [e-mail de atendimento].',
      },
      {
        kind: 'p',
        text: '11.3. **Tolerância.** A tolerância da Empregol quanto ao descumprimento de qualquer obrigação não implica renúncia ou novação.',
      },
      {
        kind: 'p',
        text: '11.4. **Nulidade parcial.** A eventual nulidade de qualquer cláusula não afeta a validade das demais.',
      },
      {
        kind: 'p',
        text: '11.5. **Cessão.** A Empregol poderá ceder sua posição nestes Termos a empresa do mesmo grupo ou a sucessora, em caso de reorganização societária, mantidas as condições contratadas.',
      },
      {
        kind: 'p',
        text: '11.6. **Idioma.** Estes Termos foram redigidos em português. Versões em outros idiomas são disponibilizadas por conveniência; em caso de divergência, prevalece a versão em português.',
      },
      {
        kind: 'p',
        text: '11.7. **Lei aplicável.** Estes Termos são regidos pelas leis da República Federativa do Brasil, sem prejuízo de normas imperativas de proteção ao consumidor e de dados pessoais do país de residência do Usuário.',
      },
      {
        kind: 'p',
        text: '11.8. **Foro.** Fica eleito o foro da Comarca de Florianópolis/SC para dirimir quaisquer controvérsias oriundas destes Termos, ressalvado ao Usuário consumidor o direito de propor ação no foro de seu domicílio.',
      },
    ],
  },
]

export const ANEXO: LegalSection = {
  number: 'Anexo I',
  title: 'Planos e Preços',
  blocks: [
    {
      kind: 'p',
      text: 'Os valores semestral e anual correspondem ao total do período dividido pelo número de meses. Preços em reais (R$), sujeitos a reajuste na forma da Cláusula 5.5.',
    },
    { kind: 'subtitle', text: 'A. Preços' },
    {
      kind: 'table',
      table: {
        head: [
          'Plano',
          'Mensal',
          'Semestral (por mês)',
          'Semestral (total)',
          'Anual (por mês)',
          'Anual (total)',
        ],
        rows: [
          ['Atleta Básico', 'R$ 39,90', 'R$ 29,90', 'R$ 179,40', 'R$ 24,90', 'R$ 298,80'],
          ['Atleta Premium', 'R$ 79,90', 'R$ 59,90', 'R$ 359,40', 'R$ 49,90', 'R$ 598,80'],
          ['Agente/Clube Gratuito', 'Sem custo', '—', '—', '—', '—'],
          [
            'Agente/Clube Pago',
            'R$ 199,90',
            'R$ 169,90',
            'R$ 1.019,40',
            'R$ 139,90',
            'R$ 1.678,80',
          ],
        ],
      },
    },
    { kind: 'subtitle', text: 'B. Planos de Atletas' },
    {
      kind: 'table',
      table: {
        head: ['Funcionalidade', 'Básico', 'Premium'],
        rows: [
          [
            'Perfil pré-validado pela Empregol, mediante checagem de identidade e documentos',
            'Sim',
            'Sim',
          ],
          ['Visibilidade nas buscas de Agentes e Clubes com cadastro aprovado', 'Sim', 'Sim'],
          ['Upload de vídeos, estatísticas e histórico esportivo', 'Sim', 'Sim'],
          ['Recebimento de contato inicial dentro da Plataforma', 'Sim', 'Sim'],
          ['Prioridade de exibição nas buscas de Agentes e Clubes', 'Não', 'Sim'],
          [
            'Contratação de sessões com Parceiros (saúde mental, jurídico, financeiro, personal trainer, entre outros) a valor corporativo reduzido, pagas à parte pelo Atleta',
            'Não',
            'Sim',
          ],
        ],
      },
    },
    { kind: 'subtitle', text: 'C. Planos de Agentes e Clubes' },
    {
      kind: 'table',
      table: {
        head: ['Funcionalidade', 'Gratuito', 'Pago Mensal', 'Pago Semestral', 'Pago Anual'],
        rows: [
          [
            'Busca de Atletas pré-validados com filtros básicos (posição, idade, região)',
            'Sim',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Perfil resumido: primeiro nome e inicial, posição, idade, região, altura, pé dominante e situação (livre ou empregado aberto a propostas)',
            'Sim',
            'Sim',
            'Sim',
            'Sim',
          ],
          ['Um highlight curto de amostra', 'Sim', 'Sim', 'Sim', 'Sim'],
          [
            'Currículo esportivo completo: nome, clubes e períodos, competições, highlights e links do YouTube, dados de campo (gols, assistências, minutos, jogos), incorporados gradualmente',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Documentos conferidos: identidade, situação contratual declarada e documentação apresentada, com a data da última conferência',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Preferências do Atleta: mudança de estado ou país e faixa salarial pretendida',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Filtros avançados: situação contratual, nível dos clubes anteriores, disponibilidade para mudança, faixa salarial, dados de campo mínimos',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Alertas de buscas salvas e de atualização de Atletas acompanhados',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Listas de observação, notas privadas e comparação lado a lado',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Chat direto com o Atleta, com contato protegido e selo de Contratante com Documentos Conferidos',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Exportação do currículo em PDF (uso restrito, Cláusula 6.4)',
            'Não',
            'Sim',
            'Sim',
            'Sim',
          ],
          [
            'Destaque em novos Atletas aprovados: acesso prioritário a perfis recém-cadastrados pelo período indicado na Plataforma (atualmente 72 horas)',
            'Não',
            'Não',
            'Sim',
            'Sim',
          ],
          ['Relatório mensal de novos talentos curados', 'Não', 'Não', 'Sim', 'Sim'],
        ],
      },
    },
    {
      kind: 'p',
      text: 'No Plano gratuito não são exibidos nome completo, histórico detalhado e links externos, e não há acesso ao Chat. O Chat com Atletas menores de 18 anos observa as salvaguardas da Cláusula 3.2.',
    },
    {
      kind: 'p',
      text: 'Demais condições não relacionadas obedecerão a legislação vigente e aplicável levando em consideração as utilizadas no Brasil.',
    },
  ],
}
