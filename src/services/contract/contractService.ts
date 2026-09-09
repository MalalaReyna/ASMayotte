import { Anthropic, toFile } from "@anthropic-ai/sdk";
import * as fs from "fs";
export async function generateContractIA(values: string) {
  const client = new Anthropic();
  //upload fichier
  const uploaded = await client.beta.files.upload({
    file: await toFile(
      fs.createReadStream("src/trame/trames_contrats_travail_AS_Mayotte_clean.pdf"),
      undefined,
      { type: "application/pdf" },
    ),
    betas: ["files-api-2025-04-14"],
  });
  const response = await client.beta.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Voici en pièce jointe un document avec plusieurs trames, tu vas utiliser la trame correspondante aux données que je vais envoyer.
          Genere un contrat de travail au format HTML/CSS en utilisant les informations suivantes : ${values}.
          Suit exactement le style de la trame du document joint a faire en css.
          Tu vas me donner le contenu généré dans htmlString. Les données que j'ai donné sont utilisées pour remplir les champs de la trame qui sont entre crochet [].`,
          },
          {
            type: "document",
            source: {
              type: "file",
              file_id: uploaded.id,
            },
          },
        ],
      },
    ],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            htmlString: { type: "string" },
          },
          required: ["htmlString"],
          additionalProperties: false,
        },
      },
    },
    betas: ["files-api-2025-04-14"],
  });
  const first = response.content[0];
  if (first.type !== "text") {
    throw new Error("Reponse IA invalide.");
  }
  console.log("Réponse brute de l'IA:", first.text);
  const parsed = JSON.parse(first.text) as { htmlString?: string };
  if (!parsed.htmlString) {
    throw new Error("Aucun lien PDF retourne par l'IA.");
  }
  return { htmlString: parsed.htmlString };
}
