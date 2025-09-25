import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function AppPagination({ links }: { links: any[] }) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    if (link.label.includes('Previous')) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationPrevious
                                    href={link.url ?? '#'}
                                    className={
                                        !link.url
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes('Next')) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationNext
                                    href={link.url ?? '#'}
                                    className={
                                        !link.url
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={link.url ?? '#'}
                                isActive={link.active}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
