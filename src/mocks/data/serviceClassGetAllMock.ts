let serviceClassGetAll = {
  legalJuridicationList: [
    {
      id: "2294a352-022e-4ba5-8ef3-60b977478efd",
      name: "SARL",
      description: "",
      slug: "",
      isLegalJuridiction: true,
      hasCapitalSocial: true,
      tarrif: 200,
      createdAt: "2026-04-10T07:00:16.793351Z",
      imageUrl: null,
    },
    {
      id: "7dd791c4-9f2d-412c-8c4b-3e0c18c380bd",
      name: "SAS",
      description: "",
      slug: "",
      isLegalJuridiction: true,
      hasCapitalSocial: true,
      tarrif: 300,
      createdAt: "2026-04-10T07:00:22.679095Z",
      imageUrl: null,
    },
    {
      id: "e5cf3850-0212-46a6-b86c-6d1c385d69c9",
      name: "EURL",
      description: "",
      slug: "",
      isLegalJuridiction: true,
      hasCapitalSocial: true,
      tarrif: 500,
      createdAt: "2026-04-10T07:00:31.318952Z",
      imageUrl: null,
    },
    {
      id: "5de0839f-d04c-4437-998c-03f2a6c3bdb1",
      name: "Entreprise Individuelle",
      description: "",
      slug: "",
      isLegalJuridiction: true,
      hasCapitalSocial: false,
      tarrif: 0,
      createdAt: "2026-04-10T07:01:00.056086Z",
      imageUrl: null,
    },
  ],
  serviceList: [
    {
      id: "d130decd-9b41-47a3-a0e0-f282e88cbe9f",
      name: "Création Entreprise",
      description: "",
      slug: "creer-mon-entreprise",
      isLegalJuridiction: false,
      hasCapitalSocial: false,
      tarrif: 0,
      createdAt: "2026-04-10T06:58:36.823006Z",
      imageUrl: null,
    },
    {
      id: "311ffad6-bb09-4f6f-acde-4ad2f3e74639",
      name: "Modification Entreprise",
      description: "",
      slug: "modifier-mon-entreprise",
      isLegalJuridiction: false,
      hasCapitalSocial: false,
      tarrif: 0,
      createdAt: "2026-04-10T06:59:01.207275Z",
      imageUrl: null,
    },
    {
      id: "9812fefc-a2c8-4294-9bc8-d39988dc42ff",
      name: "Réponses au marché public",
      description: "",
      slug: "reponse-marche-public",
      isLegalJuridiction: false,
      hasCapitalSocial: false,
      tarrif: 0,
      createdAt: "2026-04-10T06:59:29.505457Z",
      imageUrl: null,
    },
    {
      id: "2f669db5-5c27-40a0-8056-c0807685d84e",
      name: "Gestion administrative",
      description: "",
      slug: "gestion-administrative",
      isLegalJuridiction: false,
      hasCapitalSocial: false,
      tarrif: 0,
      createdAt: "2026-04-10T06:59:43.904327Z",
      imageUrl: null,
    },
  ],
};

export function getAllServiceClassMock() {
  return serviceClassGetAll;
}

export function getJuridctionOnlyMock() {
  return {
    ...serviceClassGetAll,
    legalJuridicationList: serviceClassGetAll.legalJuridicationList.filter(
      (item) => item.isLegalJuridiction === true
    ),
    serviceList: serviceClassGetAll.serviceList.filter(
      (item) => item.isLegalJuridiction === true
    )
  }
}
