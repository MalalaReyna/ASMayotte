"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDevis } from "@/services/devis/devisService";
import DevisToolbar from "./components/DevisToolbar";
import DevisTable from "./components/DevisTable";
import { toIsoWithZeroTime } from "@/helpers/dateHelper";

const DEFAULT_PAGE_SIZE = 8;

export default function DevisListPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearch = searchParams.get("search") ?? "";
  const initialFromDate = searchParams.get("fromDate") ?? "";
  const initialToDate = searchParams.get("toDate") ?? "";
  const initialPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const initialPageSize = Math.max(Number(searchParams.get("limit") || DEFAULT_PAGE_SIZE), 1);

  const [search, setSearch] = useState(initialSearch);
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  const [appliedFilters, setAppliedFilters] = useState({
    search: initialSearch,
    fromDate: initialFromDate,
    toDate: initialToDate,
  });
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.fromDate) params.set("fromDate", appliedFilters.fromDate);
    if (appliedFilters.toDate) params.set("toDate", appliedFilters.toDate);
    if (page > 1) params.set("page", String(page));
    if (pageSize !== DEFAULT_PAGE_SIZE) params.set("limit", String(pageSize));
    return params;
  }, [appliedFilters, page, pageSize]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["devis", appliedFilters.search, appliedFilters.fromDate, appliedFilters.toDate, page, pageSize],
    queryFn: () =>
      getDevis({
        search: appliedFilters.search || undefined,
        fromDate: appliedFilters.fromDate || undefined,
        toDate: appliedFilters.toDate || undefined,
        page,
        limit: pageSize,
      }),
  });

  const devis = data?.data ?? [];
  const totalCount = data?.meta?.total ?? devis.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    const queryString = queryParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, [pathname, queryParams, router]);

  useEffect(() => {
    if (!isLoading && !isFetching && page > totalPages) {
      setPage(totalPages);
    }
  }, [isLoading, isFetching, page, totalPages]);

  const applyFilters = () => {
    setAppliedFilters({
      search: search.trim(),
      fromDate:toIsoWithZeroTime(fromDate),
      toDate:toIsoWithZeroTime(toDate),
    });
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setAppliedFilters({
      search: "",
      fromDate: "",
      toDate: "",
    });
    setPage(1);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-dark">Devis envoyés par les clients</h1>
        <p className="max-w-2xl text-sm text-secondary">
          Liste des devis.
        </p>
      </div>

      <DevisToolbar
        search={search}
        fromDate={fromDate}
        toDate={toDate}
        onSearchChange={setSearch}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <DevisTable
        devis={devis}
        isLoading={isLoading || isFetching}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={(nextSize) => {
          setPageSize(nextSize);
          setPage(1);
        }}
        onPageChange={setPage}
        onOpen={(devisItem) => router.push(`/espace/devis/${devisItem.id}`)}
      />
    </section>
  );
}
