

export interface DatasWPagesState<T> {
    current_page: number | null;
    data: T[] | [];
    first_page_url: string | null;
    from: number | null;
    last_page: number | null;
    last_page_url: string | null;
    links: Array<unknown> | any | null;
    next_page_url: string | null;
    path: string | null;
    per_page: number | null;
    prev_page_url: string | null;
    to: number | null;
    total: number | null;
}
