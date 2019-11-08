import { Company } from './company.model';

export interface Computer {
    id: number;
    name: string;
    introduced: any;
    discontinued: any;
    companyModel: Company;
}