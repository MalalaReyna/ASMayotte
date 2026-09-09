"use client";

import { useMemo, useState } from "react";
import PublicTenderSection from "./PublicTenderSection";
import PublicTenderDetailsModal from "./PublicTenderDetailsModal";
import PublicTenderQuoteWizard from "./PublicTenderQuoteWizard";
import PublicTenderPrioritySection from "./PublicTenderPrioritySection";
import PublicTenderMethodSection from "./PublicTenderMethodSection";
import { GetMarketResponse } from "@/types/market/marketType";
import { getAllActivitySectors } from "@/services/sector/sectorService";
import { useQuery } from "@tanstack/react-query";
import { getAdminFiles } from "@/services/adminFiles/adminFilesService";

export default function PublicTenderExperience() {
  const [selectedTender, setSelectedTender] = useState<GetMarketResponse | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleViewDetails = (tender: GetMarketResponse) => {
    setSelectedTender(tender);
    setDetailsOpen(true);
  };

  const handleRequestQuote = (tender: GetMarketResponse) => {
    setSelectedTender(tender);
    setDetailsOpen(false);
    setQuoteOpen(true);
  };

  const { data: typesResponse } = useQuery({
    queryKey: ["types"],
    queryFn: () => getAllActivitySectors(),
  });

  const types = useMemo(() => {
    return typesResponse?.data ?? [];
  }, [typesResponse]);


  //admin files 
  const { data: adminFilesResponse } = useQuery({
    queryKey: ["adminFiles"],
    queryFn: () => getAdminFiles(),
  })

  const adminFiles = useMemo(() => {
    return adminFilesResponse?.data ?? [];
  }, [adminFilesResponse]);

  return (
    <>
      <PublicTenderSection
        onViewDetails={handleViewDetails}
        onRequestQuote={handleRequestQuote}
        activitySectors={types}
      />
      <PublicTenderPrioritySection
        onRequestQuote={handleRequestQuote}
      />
      <PublicTenderMethodSection />

      <PublicTenderDetailsModal
        open={detailsOpen}
        tender={selectedTender}
        onClose={() => setDetailsOpen(false)}
        onRequestQuote={handleRequestQuote}
      />

      <PublicTenderQuoteWizard
        services={adminFiles}
        activitySectors={types}
        open={quoteOpen}
        tender={selectedTender}
        onOpenChange={setQuoteOpen}
      />
    </>
  );
}
