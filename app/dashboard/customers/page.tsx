import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {CreateInvoice} from "@/app/ui/invoices/buttons";
import {Suspense} from "react";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
import {fetchCustomersPages} from "@/app/lib/data";
import CustomerTable from "@/app/ui/invoices/table-customer";

export default async function Page({ searchParams,}: { searchParams?: { query?: string; page?: string;};
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomersPages(query);

    console.log([query, currentPage, totalPages]);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <CustomerTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>

        </div>);
}