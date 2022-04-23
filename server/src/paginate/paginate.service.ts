import {Injectable} from "@nestjs/common";

@Injectable()
export default class PaginateService {

    static getPaginateParams(limit: number, page: number) {
        let correctPage = 1
        let offset = 0
        if (page && page > 0) {
            offset = (page - 1) * limit
            correctPage = page
        }

        return {page: +correctPage, offset}
    }

    static getTotalPages(limit: number, count: number) {
        return Math.ceil(count / limit)
    }
}