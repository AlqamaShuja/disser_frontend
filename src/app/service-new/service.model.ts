
// export interface ServiceData {
//     pagesID: number;
//     pageTitle: string;
//     pageSlug: string;
//     icon: string;
//     tagLine: string;
//     images: string;
//     menuIconImage: string;
//     postiontodisplay: number;
//     PrimaryPage: number;
//     shortDescription: string;
//     pageDescription: string;
//     metaKeyWord: string;
//     metaDescription: string;
//     additionalHeaders: string;
// }

export interface SubService {
  id: number;
  title: string;
  price: string;
  description: string;
}

export interface ServiceData {
  id: number;
  title: string;
  price: string;
  description: string;
  subServices: SubService[];
}
