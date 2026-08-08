import { useCallback, useEffect, useState } from "react";

import reportService from "../services/reportService.js";

export default function useReports(initialFilters = {}) {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [filters, setFilters] = useState(initialFilters);

    const loadReports = useCallback(async (params = filters) => {

        try {

            setLoading(true);

            setError(null);

            const data = await reportService.getReports(params);

            setReports(data || []);

        } catch (err) {

            setError(err);

            console.error(err);

        } finally {

            setLoading(false);

        }

    }, [filters]);

    useEffect(() => {

        loadReports();

    }, [loadReports]);

    async function refresh() {

        return loadReports(filters);

    }

    async function search(newFilters = {}) {

        const merged = {

            ...filters,

            ...newFilters

        };

        setFilters(merged);

        return loadReports(merged);

    }

    async function generate(params = filters) {

        return reportService.generateReport(params);

    }

    async function exportPDF(params = filters) {

        return reportService.exportPDF(params);

    }

    async function exportExcel(params = filters) {

        return reportService.exportExcel(params);

    }

    return {

        reports,

        loading,

        error,

        filters,

        setFilters,

        refresh,

        search,

        generate,

        exportPDF,

        exportExcel

    };

}