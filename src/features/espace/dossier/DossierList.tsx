"use client";

import { useMemo, useState } from "react";
import DossierFilters from "./DossierFilters";
import DossierTable from "./DossierTable";
import { DossierItem } from "@/types/dossier/dossierTypes";

type DossierListProps = {
  dossiers: DossierItem[];
};

export default function DossierList({ dossiers }: DossierListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [territory, setTerritory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(dossiers.map((item) => item.category))),
    [dossiers]
  );
  const statuses = useMemo(
    () => Array.from(new Set(dossiers.map((item) => item.status))),
    [dossiers]
  );
  const territories = useMemo(
    () => Array.from(new Set(dossiers.map((item) => item.territory))),
    [dossiers]
  );

  const filteredDossiers = useMemo(() => {
    return dossiers.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.reference.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query);

      const matchesCategory = category === "" || item.category === category;
      const matchesStatus = status === "" || item.status === status;
      const matchesTerritory = territory === "" || item.territory === territory;

      return matchesSearch && matchesCategory && matchesStatus && matchesTerritory;
    });
  }, [dossiers, search, category, status, territory]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setTerritory("");
  };

  return (
    <div className="space-y-4">
      <DossierFilters
        search={search}
        category={category}
        status={status}
        territory={territory}
        categories={categories}
        statuses={statuses}
        territories={territories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onTerritoryChange={setTerritory}
        onReset={resetFilters}
      />
      <DossierTable dossiers={filteredDossiers} totalCount={dossiers.length} />
    </div>
  );
}
