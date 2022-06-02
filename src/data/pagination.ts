export function pagination(value: any[], args: any): any {
    const itemsPerPage = args && args.itemsPerPage ? parseInt(args.itemsPerPage, 10) : 10;
    const currentPage = args && args.currentPage ? parseInt(args.currentPage, 10) : 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    value = value.slice(startIndex, startIndex + itemsPerPage);
    return value;
}
