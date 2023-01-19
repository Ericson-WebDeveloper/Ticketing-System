export interface Paginate {
    
}

// import { DatasWPagesState } from "../models/DatawPages";

// export default class Pagination {
//     n: number;
//     applications: DatasWPagesState<Array<unknown>>;
//     page1: number[] | [];
//     page2: number[] | [];
//     pages: number[][] | [];
//     paginates: number[][] | [];
//     setPage1: React.Dispatch<React.SetStateAction<number[]  | []>>;
//     setPage2: React.Dispatch<React.SetStateAction<number[] | []>>;

//     constructor(n: number, applications: DatasWPagesState<Array<unknown>>, page1: number[], page2: number[], 
//         setPage1: React.Dispatch<React.SetStateAction<number[] | []>>, setPage2: React.Dispatch<React.SetStateAction<number[] | []>>) {
//         this.n = n;
//         this.pages = [];
//         this.paginates = [];
//         this.applications = JSON.parse(JSON.stringify(applications));
      
//         this.applications?.links?.shift();
//         this.applications?.links?.pop();

//         this.page1 = page1;
//         this.page2 = page2;
//         this.setPage1 = setPage1;
//         this.setPage2 = setPage2;

//         this.returnResults();
//     }

//     returnResults = () => {
//         this.pages = [];
//         this.paginates = [];
//         this.setPage1([]);
//         this.setPage2([]);
//         this.pages = this.getPages(this.applications.links as string[]);
//         this.paginates = this.grouping(this.pages);
//         this.returnPages();
       
//     }

//     grouping(arr: number[][]) {
//         let number = this.n;
//         let pagination = arr.reduce<number[]>((r, e, i) =>
//             (i % number ? r[r.length - 1].push(e) : r.push([e])) && r
//         , []);
        
//         return pagination;
//     }

//     getPages(datas: string[]) {
//         let pages: number[] = [];
//             datas.forEach((element: any, index: number) => {
//                 pages.push(index+1);
//             });
//         return pages;
//     }

//     returnPages() {
//         let p: number = 0;
//         this.paginates.forEach((arr, index) => {
//             if(arr.includes(this.applications.current_page || 0)) {
//                 p = index;
//             }
//         });
        
//         Array.from(this.paginates[p]).forEach((pa) => {
//             // this.page1.push({page:pa})
//             this.setPage1((prev: any) => ([...prev, {page:pa}]))
//         });

//         if(this.paginates[p + 2]) {
//             this.returnFormattedPage(this.paginates[p + 2], this.setPage2);
//         } else {
//             if(this.paginates[p + 1]) {
//                 this.returnFormattedPage(this.paginates[p + 1], this.setPage2); 
//             } else {
//                 if(this.paginates[p-1]) {
//                     this.setPage1([]);
//                     this.returnFormattedPage(this.paginates[p], this.setPage2);
//                     this.returnFormattedPage(this.paginates[p-1], this.setPage1);
//                 } 
//             }
//         }
//     }

//     returnFormattedPage (arrayData: number[], pushdata: React.Dispatch<React.SetStateAction<number[] | []>>) {
//         Array.from(arrayData).forEach((pa) => {
//             pushdata((prev: any) => ([...prev, {page:pa}]))
//         });
//     }

//     returnPagination() {
//         return ``;
//     }
// }